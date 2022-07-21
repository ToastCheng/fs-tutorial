import express from 'express';

const app = express();
const port = 3000;

// Add a middleware.
app.use(express.json());


const handler = (req, res) => {
    // Read req....
    console.log(req.method);

    // Write res...
    res.send(`Hi! your method is ${req.method}`);
};

// function func(i) {
//     return i + 1;
// }
// func(1) => 2
// func(2) => 3

// Arrow function.
// const func = (i) => i + 1;
// const func = i => i + 1;
// const func = i => {
//     console.log('lll');
//     return i + 1;
// }

const addHandler = (req, res) => {
    res.send('Get Post request');
};

// Define how to deal with requests with differnet route..
app.get('/', handler);
app.post('/add', addHandler);


// 1. req.params
const getUserHandler = (req, res) => {
    const id = req.params['id'];
    // const { id } = req.params;

    res.send(`Get id ${id}`);
}

app.get('/get_user/:id', getUserHandler);

// 2. req.query
const getUser2Handler = (req, res) => {
    const id = req.query['id'];
    res.send(`Get id ${id}`);
}

app.get('/get_user2', getUser2Handler);


// app.METHOD(ROUTE, HANDLER);

const addUserHandler = (req, res) => {
    const json = req.body;

    res.send(`Hi ${json['name']}`);
}

app.post('/add_user', addUserHandler);

// Start listen for request..
app.listen(port, () => {
    console.log('Starting...');
});
