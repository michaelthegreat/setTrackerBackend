import { SetDB } from '../db/setDB';

export class SetBO {
    constructor() {}

    getSets = async(obj: any, args: any, context: any) => {
        const db = new SetDB();
        return await db.findAll();
    }
}
// const params = {
//     TableName : "Projects"
//     ,Limit : 100
// };


// exports.handler = async (event,context,callback) => {
//     let query = function(){
//         return new Promise(resolve=>{
//             ddb.scan(params, function(err, data) {
//                 if (err) {
//                     console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
//                     resolve(null);
                    
//                 } else {
//                     return resolve(data.Items);
//                 }
//             });
//         });
//     };
//     let results = await query();
//     callback(null,results);
//     // callback(null,response);
// };
