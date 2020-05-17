const express = require('express');
const app = express();
const port = 3000;
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');
var cors = require('cors');


app.use(express.json());
app.use('*', cors());
app.use('/graphql', cors(), graphqlHttp({
    schema: schema,
    rootValue: global,
    graphiql: true
}));

mongoose.connect('mongodb://localhost/my-gologolo', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => { //if the connection is successful.
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    })
})
.catch(err => { // if there is an error.
    console.log(err);
});