const AWS = require('aws-sdk');
const localDynamo = require('local-dynamo');

// import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';
// const serviceConfigOptions: ServiceConfigurationOptions = {
//     region: "local",
//     endpoint: "http://localhost:8000"
// };
// AWS.config.update(serviceConfigOptions);

export class DDBUtil {

    private db: any;
    private localProcess: any

    constructor() {
    }

    init() {
        AWS.config.update({ region: 'local', endpoint: 'http://localhost:8000' });
        this.localProcess = localDynamo.launch(null, 8000);
        this.db = new AWS.DynamoDB();
    }
    
    clean() {
        this.localProcess.kill();
    }

    createTable(tableName: string, keyName: string): Promise<any> {
        const params = {
            TableName: tableName,
            KeySchema: [{ AttributeName: keyName, KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: keyName, AttributeType: 'S' }],
            ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 },
        };
        return new Promise((resolve, reject) => {
            this.db.createTable(params, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    createTableWithIndex(tableName: string, idAttributeName: string, createData: any, indexesParams: any) {
        let params = {
            TableName: tableName,
            KeySchema: [{ AttributeName: idAttributeName, KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: idAttributeName, AttributeType: 'S' }],
            ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 },
            GlobalSecondaryIndexes: []
        };

        // add multiple indexes
        for (let i = 0; i < indexesParams.length; i += 1) {
            const indexName = indexesParams[i].indexName;
            const indexKeyName = indexesParams[i].indexKeyName;
            const indexKeyAttributeType = indexesParams[i].indexKeyAttributeType;
            const indexSortKeyName = indexesParams[i].indexSortKeyName;
            const indexSortKeyAttributeType = indexesParams[i].indexSortKeyAttributeType;

            // add the attribute definition
            const attributeDef = {
                AttributeName: indexKeyName,
                AttributeType: indexKeyAttributeType
            };
            params.AttributeDefinitions.push(attributeDef);

            // create the index
            let index = {
                IndexName:indexName,
                KeySchema:[],
                Projection: {},
                ProvisionedThroughput: {}
            };

            // add the keyschema to the index
            const keySchemaAttribute = {
                AttributeName: indexKeyName,
                KeyType: 'HASH'
            };
            index.KeySchema.push(keySchemaAttribute);

            // if present, add the sort key to the index and the attribute definition
            if (indexSortKeyName) {
                const sortKeyAttributeDef = {
                    AttributeName: indexSortKeyName,
                    AttributeType: indexSortKeyAttributeType
                };
                params.AttributeDefinitions.push(sortKeyAttributeDef);

                const sortKeySchemaAttribute = {
                    AttributeName: indexSortKeyName,
                    KeyType: 'RANGE',
                };
                index.KeySchema.push(sortKeySchemaAttribute);
            }

            // add the throughput to the index
            let throughput = {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            };
            index.ProvisionedThroughput = throughput;

            // add the projection to the index
            index.Projection = { ProjectionType: 'ALL' };

            // add the index
            params.GlobalSecondaryIndexes.push(index);
        }

        return new Promise((resolve, reject) => {
            this.db.createTable(params, (err: any) => {
                if (err) {
                    reject(err);
                }
                else if (createData) {
                    this.db.putItem(createData, (err: any) => { // eslint-disable-line no-shadow
                        if (err) {
                            console.error('Unable to add data. Error JSON:', JSON.stringify(err, null, 2)); // eslint-disable-line no-console, max-len
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    writeData(writeData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.batchWriteItem(writeData, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
