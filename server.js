const data = {};

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static('website'));

const port = 3000;
app.listen(port, ()=>{
    console.log(`Running on localhost : ${port}`);
})

app.get('/all',recieveInfo)

function recieveInfo(req,res){
    res.send(data);
}

app.post('/add',postInfo)

function postInfo(req,res){
    console.log(req)
    data['todayDeaths'] = req.body.todayDeaths;
    data['todayCases'] = req.body.todayCases;
    data['todayRecovered'] = req.body.todayRecovered;
    data['critical'] = req.body.critical;
    data['country'] = req.body.country;
    data['deaths'] = req.body.deaths;
    data['cases'] = req.body.cases;
    data['active'] = req.body.active;
    data['recovered']  = req.body.recovered;
    res.send(data);
}