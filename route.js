module.exports = function greetingsRoutes(greetings) {

    //render the home page
    async function home(req, res, next) {
        try {
            var count = await greetings.greetCount();
            res.render('home', {
                counter: count
            });

        } catch (err) {
            next(err)
        }
    }
    //get all names of greeted users
    async function greetingNames(req, res, next) {
        var name = req.body.userName;
        var language = req.body.radio;
        var count = await greetings.greetCount();
        try {

            if (name === '' && language === undefined) {
                req.flash('error', 'Please enter your name and select a langauge');

            }
            else if (language === undefined) {
                req.flash('error', 'Please select a language');
            }
            else if (name === '') {
                req.flash('error', 'Please enter a name');
            } else {
                await greetings.addNames(name);
                var count = await greetings.greetCount();
                var greetedUsers = await greetings.greetUser(name, language);
            }
            res.render('home', {
                greetUser: greetedUsers,
                greetCount: count
            });
        } catch (err) {
            next(err);
        }
    }
    //counts each name & gets the count
    async function countAll(req, res) {
        var name = req.params.name;
        var numberOfTimes = await greetings.countPerson(name)
        //return the object key in this case
        for (const key in numberOfTimes) {
            var element = numberOfTimes[key];
        }
        res.render('counter', {
            name: name,
            counter: element
        });

    }


    //greeted route
    async function greetedNames(req, res, next) {
        var name = req.params.name;
        try {
            const names = await greetings.getAllUsers(name)
            res.render('greeted', 
                { name: names });
            

        } catch (err) {
            next(err)
        }
    }

    //reset function
    async function reset(req, res, next) {
        var reset = await greetings.reset()
        try {
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
        greetedNames
    }
}

