module.exports = function greetingsRoutes(greetings) {
    async function home(req, res, next) {
        //render the home page
        try {
            res.render('home');
        } catch (err) {
            next(err)
        }
    }
    async function greetingNames(req, res, next) {
        //get all names of greeted users
        const name = req.body.textItem;
        const language = req.body.selector;
        const greetedUsers = greetings.greetUser(name, language);
        
        try {
            if (name === '' && language === undefined) {
                req.flash('error', 'Please enter your name and select a langauge');
            }
            else if (language === undefined) {
                req.flash('error', 'Please select a language');
            }
            else if (name === '') {
                req.flash('error', 'Please enter a name');  
            }else {
                await greetings.addToDatabase(name);
                var count = await greetings.getGreetCounter(name);
            }
            res.render('home', {
                txtBox: await greetedUsers,
                counter: count
            });
        } catch (err) {
            next(err);
        }
    }
    async function greeted(req, res, next) {
        var name = req.params.name;
        //greeted route

        try {
            const names = await greetings.getAllUsers(name)
            res.render('greeted', {
                name: names
            });

        } catch (err) {
            next(err)
        }
    }
    async function countAll(req, res, next) {
        var name = req.params.name;
        //counts each name & gets the count
        try {
            var count = await greetings.countPerson(name)
            res.render('counter', {
                name: name,
                counter: count
            })
        } catch (err) {
            next(err)
        }
    }

    async function reset(req, res, next) {
        //reset function
        try {
            var reset = await greetings.reset()
            res.render('home')
        } catch (err) {
            next(err)
        }

    }

    return {
        reset,
        home,
        greetingNames,
        countAll,
        greeted
    }
}