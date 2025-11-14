# Deploy Free Tier PowerShell
$AWS_REGION = "us-east-1"
$STACK_NAME = "plenna-freetier"
$KEY_NAME = "plenna-key"

Write-Host "Deploy Free Tier AWS..." -ForegroundColor Green

# Verificar se CLI esta configurado
$identity = aws sts get-caller-identity 2>$null
if (-not $identity) {
    Write-Host "AWS CLI nao configurado. Execute: aws configure" -ForegroundColor Red
    exit 1
}

# Criar key pair se nao existir
$keyExists = aws ec2 describe-key-pairs --key-names $KEY_NAME 2>$null
if (-not $keyExists) {
    Write-Host "Criando key pair..." -ForegroundColor Yellow
    $keyMaterial = aws ec2 create-key-pair --key-name $KEY_NAME --query "KeyMaterial" --output text
    $keyMaterial | Out-File -FilePath "${KEY_NAME}.pem" -Encoding UTF8
    Write-Host "Key pair criada: ${KEY_NAME}.pem" -ForegroundColor Green
}

# Criar infraestrutura
Write-Host "Criando infraestrutura..." -ForegroundColor Yellow
$createResult = aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://aws/cloudformation-simple.yml --region $AWS_REGION 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao criar stack: $createResult" -ForegroundColor Red
    exit 1
}

Write-Host "Aguardando criacao da stack..." -ForegroundColor Yellow
aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $AWS_REGION

# Verificar se stack foi criada com sucesso
$stackStatus = aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].StackStatus" --output text --region $AWS_REGION
if ($stackStatus -ne "CREATE_COMPLETE") {
    Write-Host "Stack falhou com status: $stackStatus" -ForegroundColor Red
    Write-Host "Verificando erros..." -ForegroundColor Yellow
    aws cloudformation describe-stack-events --stack-name $STACK_NAME --query "StackEvents[?ResourceStatus=='CREATE_FAILED'].[LogicalResourceId,ResourceStatusReason]" --output table --region $AWS_REGION
    exit 1
}

# Obter outputs
$EC2_IP = aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='EC2PublicIP'].OutputValue" --output text --region $AWS_REGION
# $DB_ENDPOINT = aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='DatabaseEndpoint'].OutputValue" --output text --region $AWS_REGION
$S3_URL = aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='S3WebsiteURL'].OutputValue" --output text --region $AWS_REGION

# Deploy frontend no S3
Write-Host "Fazendo build do frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build

$ACCOUNT_ID = aws sts get-caller-identity --query Account --output text
$BUCKET_NAME = "plenna-frontend-$ACCOUNT_ID"

# Configurar bucket para website
Write-Host "Configurando bucket S3..." -ForegroundColor Yellow
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Upload com MIME types corretos
Write-Host "Fazendo upload dos arquivos..." -ForegroundColor Yellow
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.js" --content-type "application/javascript"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.css" --content-type "text/css"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.html" --content-type "text/html"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.json" --content-type "application/json"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.png" --content-type "image/png"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.jpg" --content-type "image/jpeg"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.ico" --content-type "image/x-icon"

# Aplicar bucket policy
Write-Host "Configurando acesso publico..." -ForegroundColor Yellow
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::$BUCKET_NAME/*\"}]}"

Set-Location ..

Write-Host "Deploy concluido!" -ForegroundColor Green
Write-Host "EC2: http://$EC2_IP" -ForegroundColor Cyan
Write-Host "Database: SQLite local" -ForegroundColor Cyan
Write-Host "Frontend: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. SSH na EC2: ssh -i ${KEY_NAME}.pem ec2-user@$EC2_IP"
Write-Host "2. Configure DATABASE_URL=file:./dev.db (SQLite local)"
Write-Host "3. Clone o repo e rode: docker-compose up -d"