aws cloudformation delete-stack --stack-name github-info-service
aws cloudformation wait stack-delete-complete --stack-name github-info-service

aws cloudformation delete-stack --stack-name github-info-network
aws cloudformation wait stack-delete-complete --stack-name github-info-network

aws ecr batch-delete-image --repository-name github-info --image-ids imageTag=latest
aws cloudformation delete-stack --stack-name github-info-repo
aws cloudformation wait stack-delete-complete --stack-name github-info-repo