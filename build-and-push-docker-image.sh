docker build -t github-info .

$(aws ecr get-login-password --region eu-central-1) 020712779899.dkr.ecr.eu-central-1.amazonaws.com
aws cloudformation create-stack --stack-name github-info --template-body file://cloudformation/ecr.yaml
docker tag github-info:latest 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest
docker push 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest