# Deploy Frontend S3 PowerShell
$AWS_REGION = "us-east-1"

Write-Host "Deploy Frontend S3..." -ForegroundColor Green

# Verificar se CLI esta configurado
$identity = aws sts get-caller-identity 2>$null
if (-not $identity) {
    Write-Host "AWS CLI nao configurado. Execute: aws configure" -ForegroundColor Red
    exit 1
}

# Obter Account ID
$ACCOUNT_ID = aws sts get-caller-identity --query Account --output text
$BUCKET_NAME = "plenna-frontend-$ACCOUNT_ID"

# Verificar se bucket existe
$bucketExists = aws s3api head-bucket --bucket $BUCKET_NAME 2>$null
if (-not $bucketExists) {
    Write-Host "Criando bucket S3..." -ForegroundColor Yellow
    aws s3api create-bucket --bucket $BUCKET_NAME --region $AWS_REGION
}

# Configurar bucket para website publico
Write-Host "Configurando bucket para website..." -ForegroundColor Yellow
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

# Configurar website
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Pular bucket policy por enquanto
Write-Host "Configuracao de website concluida" -ForegroundColor Green

# Build frontend
Write-Host "Fazendo build do frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build

# Upload arquivos com MIME types corretos
Write-Host "Fazendo upload dos arquivos..." -ForegroundColor Yellow
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.js" --content-type "application/javascript"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.css" --content-type "text/css"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.html" --content-type "text/html"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.json" --content-type "application/json"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.png" --content-type "image/png"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.jpg" --content-type "image/jpeg"
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --exclude "*" --include "*.ico" --content-type "image/x-icon"

# Configurar bucket policy manualmente depois do upload
Write-Host "Configurando acesso publico..." -ForegroundColor Yellow
$policyJson = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
"@

[System.IO.File]::WriteAllText("policy.json", $policyJson)
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://policy.json
# Remove-Item "policy.json" -Force

Set-Location ..

# Obter URL do website
$websiteURL = aws s3api get-bucket-website --bucket $BUCKET_NAME --query "IndexDocument.Suffix" --output text 2>$null
if ($websiteURL) {
    $S3_URL = "http://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"
} else {
    $S3_URL = "http://$BUCKET_NAME.s3-website.amazonaws.com"
}

Write-Host "Frontend deploy concluido!" -ForegroundColor Green
Write-Host "URL: $S3_URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "Teste o frontend acessando a URL acima!" -ForegroundColor Yellow