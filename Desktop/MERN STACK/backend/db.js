

const {MongoClient} = require('mongodb');

let dbConnection
//let url = 'mongodb+srv://Yousif59:Samiraq-1975@cluster0.esz9tqy.mongodb.net/?retryWrites=true&w=majority';
let url = 'mongodb+srv://Yousif59:Samiraq-1975@cluster0.esz9tqy.mongodb.net/?retryWrites=true&w=majority';


module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(url)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}