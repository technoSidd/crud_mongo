require('./models/db');
const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const app = express();


const employeeController = require('./controllers/employeeController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const userController = require('./controllers/userController');
const jobController = require('./controllers/jobController');

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');


app.listen(3000, () => {
    console.log('Express server started at : 3000');
});

app.use('/dashboard', dashboardController);
app.use('/employee', employeeController);
app.use('/allProject', projectController);
app.use('/auth', userController);
app.use('/addJob', jobController);
