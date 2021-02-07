### Preconditions ###
* node version: ```12.14.1```

### Development ###
* Clone repository: ```git clone https://github.com/NSS22/GitHubInfo.git```
* Install dependencies: ```npm install```
* Create ```.env``` file in root directory and add property:
  ```SERVER_PORT=4000```
* Run server: ```npm run start```
  ```
  API information is accessible by: http://localhost:4000/api-docs/
  ```
* Run test: ```npm test```

### Scripts ###
* Build and push project docker image to AWS ECR repository: 
  ```npm run build:push:image```
  ```
  Before running script you need change "AWS accountId"
  and "Region" in "build-and-push-docker-image.sh" file
  ```