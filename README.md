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
* Create and deploy AWS services: 
  ```npm run create:stack```
  ```
  Before running script you need change "AWS accountId", "Region" and
   "ParameterKey=ImageUrl" in "create-deploy-components-stack.sh" file
  ```
* Delete created AWS services:
  ```npm run delete:stack```