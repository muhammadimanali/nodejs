const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');

const app = express ();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
    {
        "name": "Iman",
        "industry": "Networking"
    },
    {
        "name": "Joe",
        "industry": "Neurology"
    },
    {
        "name": "Calum",
        "industry": "Medicine"
    }
]

const customer = new Customer({
    name: 'iman',
    industry: 'marketing'
});

// customer.save();

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.get('/api/customers', async(req, res) => {
    try{
        const result = await Customer.find();
        res.send({"customers": result});
    } catch(e){
        res.status(500).json({error: e.message});
    }
});

app.post('/', (req, res) => {
    res.send('This is a post request!');
});

const start = async () => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log('App listening on port ' + PORT);
        });
    } catch(e) {
        console.log(e.message)
    }
};

start();