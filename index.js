let express = require("express");//set up web application
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session = require('express-session');
const Greeting = require("./greetings");

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

var greetings = Greeting(pool)

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public')); //enable the css

app.get('/', function (req, res) {

    res.render('home', {

    });
});

app.get('/greeted', async function (req, res) {
    const names = await greetings.getAllUsers();
    res.render('greeted',
        { name: names })

});
app.get('/reset', async function (req, res) {

     await greetings.reset()

    res.render('home')
})

app.get('/counter/:user', async function (req, res) {
    var user = req.params.user
    var numberOfTimes = await greetings.countPerson(user)

    for (const key in numberOfTimes) {
            var element = numberOfTimes[key];
        
    }
    res.render('counter', {
        name: user,
        counter: element
    })
});
app.post('/greetings', async function (req, res) {
    var name = req.body.userName;
    var language = req.body.radio;
    if (name === '' && language === undefined) {
        req.flash('error', 'Please enter your name and select a langauge')
    }
    else if (language === undefined) {
        req.flash('error', 'Please select a language')
    }
    else if (name === '') {
        req.flash('error', 'Please enter a name')
    }
    await greetings.addNames(name);
   
       if(name !=='' && language !==""){
        var greetUsers = await greetings.greetUser(name, language)
        var greetingCounter = await greetings.greetCount();
    }
    res.render('home', {
        greetUser: greetUsers,
        greetCount: greetingCounter

    });
    

});


let PORT = process.env.PORT || 2009;
app.listen(PORT, function () {
    console.log("App Starts on Port", PORT);
});


