docker build -t github-info .

docker login -u AWS -p $(aws ecr get-login-password --region eu-central-1) 020712779899.dkr.ecr.eu-central-1.amazonaws.com

aws cloudformation create-stack --stack-name github-info-repo \
        --template-body file://cloudformation/ecr.yaml \
        --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name github-info-repo

docker tag github-info:latest 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest
docker push 020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest
aws cloudformation create-stack --stack-name github-info-network \
      --template-body file://cloudformation/network.yaml \
      --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name github-info-network

aws cloudformation create-stack --stack-name github-info-service \
      --template-body file://cloudformation/service.yaml  \
      --capabilities CAPABILITY_NAMED_IAM \
      --parameters 'ParameterKey=ImageUrl, ParameterValue=020712779899.dkr.ecr.eu-central-1.amazonaws.com/github-info:latest'
aws cloudformation wait stack-create-complete --stack-name github-info-service