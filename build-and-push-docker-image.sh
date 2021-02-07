docker build -t github-info .

$(aws ecr get-login-password --region eu-central-1) 020712779899.dkr.ecr.eu-central-1.amazonaws.com
aws ecr create-repository --repository-name github-info
docker tag github-info:latest 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest
docker push 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest