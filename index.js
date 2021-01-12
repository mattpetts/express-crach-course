const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const app = express();
const members = require('./Members');

// Init middleware
//app.use(logger)

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Render a handlebars index
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    })
});



// set static folder for rendering HTML
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server running on port ' + PORT)
});