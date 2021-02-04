aws ecr get-login --no-include-email --region github-info | /bin/bash
npm install
docker build -t github-info .
docker tag github-info:latest 020712779899.dkr.ecr.github-info.amazonaws.com/github-info:latest
docker push 020712779899.dkr.ecr.github-info.amazonaws.com/github-info:latest