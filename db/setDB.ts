const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
export class SetDB {
  findAll() {
    const params = {
      TableName: 'Sets',
      Limit: 1000
    };
    // const seq = new db()
    return new Promise((resolve, reject) => {
      dynamo.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          let sets = [];
          console.log('dynamodb query returned data', data)
          data.Items.map(item => {
            let setItem = {
              id: item.id,
              date: item.date
            };
            sets.push(setItem);
          })
          resolve(sets);
        }
      });
    });
  }
}