Set tracker backend 
apollo-lambda graphql server

AWS_PROFILE=qapplications serverless deploy

Service Information
service: set-tracker-apollo-lambda
stage: dev
region: us-east-1
stack: set-tracker-apollo-lambda-dev
resources: 12
api keys:
  None
endpoints:
  POST - https://jb1juh1a0i.execute-api.us-east-1.amazonaws.com/dev/graphql
  GET - https://jb1juh1a0i.execute-api.us-east-1.amazonaws.com/dev/graphql
functions:
  graphql: set-tracker-apollo-lambda-dev-graphql
layers:
  None
Serverless Enterprise: Run `serverless login` and deploy again to explore, monitor, secure your serverless project for free.