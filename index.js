let express = require("express");//set up web application
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session = require('express-session');
const Greeting = require("./greetings");
var routes = require('./route');

const handlebarSetup = exphbs({
    defaultLayout: 'main'

});

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://teko:teko123@localhost:5432/greetings';
const pool = new Pool({
    connectionString
});


app.use(session({
    secret: "my flash",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());


app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public')); //enable the css

    
app.get('/', routes.home);

app.post('/greetings', routes.greetingNames);

app.get('/greeted', routes.greeted);

app.get('/counter/:user', routes.countAll);

app.get('/reset', routes.reset);



let PORT = process.env.PORT || 2009;
app.listen(PORT, function () {
    console.log("App Starts on Port", PORT);
});


