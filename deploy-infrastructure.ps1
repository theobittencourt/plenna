# Deploy Infrastructure PowerShell
$AWS_REGION = "us-east-1"
$STACK_NAME = "plenna-freetier"
$KEY_NAME = "plenna-key"

Write-Host "Deploy Infrastructure AWS..." -ForegroundColor Green

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

Write-Host "Infrastructure deploy concluido!" -ForegroundColor Green
Write-Host "EC2: http://$EC2_IP" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Execute: .\deploy-frontend.ps1"
Write-Host "2. SSH na EC2: ssh -i ${KEY_NAME}.pem ec2-user@$EC2_IP"
Write-Host "3. Configure o backend na EC2"