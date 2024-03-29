const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Api calcul du cout !')
})

app.get('/cout/:km', (req, res) => {
    console.log(req.params.km)
    var km = req.params.km;
    var cout = km * 0.25;
    res.send({cout: cout})
})

app.listen(8081, () => {
    console.log('Example app listening on port 8081!')
})

module.exports = app;