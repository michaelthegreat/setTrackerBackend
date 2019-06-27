'use strict'

const AWS = require('aws-sdk');

const setTB = new AWS.DynamoDB.DocumentClient({
    params: { TableName: process.env.SET_TABLE }
})
const dynamodb = new AWS.DynamoDB();

const ddb = {
    SetTB: setTB,
    Dynamodb: dynamodb
};

export { ddb };