### Overview ###

* Install dependencies: ```npm install```
* Create ```.env``` file in root directory:
  ```
  #Server
  SERVER_PORT=4000
  
  #AWS accout
  ACCOUNT_NUMBER=...
  REGION=...
  IMAGE_NAME=github-info
  IMAGE_TAG=default: latest
  CIDR=...
  SUBNET_ID_1=...
  SUBNET_ID_2=...
  ```
* Run server: ```npm run start:dev```
  ```
  API information: http://localhost:4000/api-docs/
  ```
* Run test: ```npm test```
* Deploy to AWS: ```npm run deploy:dev```
* Destroy resource from AWS: ```npm run destroy:dev```