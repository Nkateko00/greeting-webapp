module.exports = function (pool) {

    async function addNames(name) {
        var specialCase = /[^A-Za-z]/g;
        var noNumber = name.replace(specialCase, "")
        var nameReceieved = noNumber.charAt(0).toUpperCase() + noNumber.slice(1).toLowerCase();

        if (nameReceieved !== "") {
            const working = await pool.query(`select id from greetings where name = $1`, [name]);
            if (working.rowCount === 0) {
                await pool.query(`insert into greetings (name, counter) values ($1,0)`, [name])
            }
            await pool.query(`update greetings set counter = counter+1 where name =$1`, [name])
        }
    }
    async function greetCount() {
        const counter = await pool.query(`select count(*) as counter from greetings`)
        return counter.rows[0].counter 
    }

    async function countPerson(name) {
        const counter = await pool.query(`select counter from greetings where name = $1`, [name])
        return counter.rows[0]
    }

    async function getAllUsers() {
        const users = await pool.query(`select name from greetings`)
        return users.rows;
    }

    async function reset() {
        await pool.query(`delete from greetings`)

        //return users;
    }

    async function greetUser(name, language) {
        switch (language) {
            case "French":
                return "Bonjour  " + name;
            case "Xitsonga":
                return "Ahe  " + name;
            case "English":
                return "Hello " + name;
            default:
                return "";
        }
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
