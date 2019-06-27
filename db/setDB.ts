export class SetDB {
    async findAll (){
        try {
            // const seq = new db()
            let results = [
                {
                    id: 1,
                    name: 'some-fake-data'
                }
            ];
            console.log(results);
            return {
                data: results
            }
        } catch (error) {
            console.log(error);

            return error;
        }
    }
}