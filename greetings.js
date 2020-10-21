module.exports = function (pool) {


    async function greetUser(user, language) {
        var specialCase = /[^A-Za-z]/g;
        var lettersOnly = user.replace(specialCase, "")
        var fixedName = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()

        switch (language) {
            // case !name || !language :
            case "French":
                return "Bonjour  " + fixedName;
            case "Xitsonga":
                return "Ahe  " + fixedName;
            case "English":
                return "Hello " + fixedName;
            default:
                return "";

        }

    }
    async function addNames(name) {

        if (!name == "") {
            var specialCase = /[^A-Za-z]/g;
            var noNumber = name.replace(specialCase, "")
            var nameReceieved = noNumber.charAt(0).toUpperCase() + noNumber.slice(1).toLowerCase();

            const verify = await pool.query(`select id from greetings where name = $1`, [nameReceieved])
            if (verify.rowCount === 0) {
                await pool.query(`insert into greetings (name,counter) values ($1, 0)`, [nameReceieved]);
            }
            await pool.query(`update greetings set counter = counter+1 where name = $1`, [nameReceieved])
        }
    }
    async function greetCount() {
        const counter = await pool.query(`select count(*) as counter from greetings`)
        return counter.rows[0].counter

    }

    async function countPerson(name) {
        const person = await pool.query(`select counter from greetings where name = $1`, [name])
        return person.rows[0];
    }

    async function getAllUsers() {
        const users = await pool.query(`select name from greetings`)
        return users.rows;
    }

    async function reset() {
        const users = await pool.query(`delete from greetings`)
        return users.rows;
    }



    return {
        greetCount,
        reset,
        countPerson,
        getAllUsers,
        addNames,
        greetUser

    }



}











