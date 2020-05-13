const express = require('express');
const app = express();
const port = 3000;
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');


app.use(express.json());
app.use('/graphql', graphqlHttp({
    schema: null,
    rootValue: null,
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