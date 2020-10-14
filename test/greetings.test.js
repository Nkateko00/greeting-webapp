let assert = require("assert");
let Greeting = require('../greetings')


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://teko:teko123@localhost:5432/greetings';
    const pool = new Pool({
        connectionString
    });


    var greetings = Greeting(pool);


    describe('The addNames function', function () {

        beforeEach(async function () {
            await pool.query(`delete from greetings`);
        });

        it("should add any name when greeted onto the database",function(){

            var name = "Teko";

            await greetings.countPerson(name)
            const appUsers = await greetings.getAllUsers()
            assert.deepEqual([{ name: "Teko" }], appUsers)

        });
         
        it("should add more than one name on the database",function(){
            var name1 = "Teko";
            var name2 = "Khanyisile";
            var name3 = "Sizwe";
            await greetings.countPerson(name1)
            await greetings.countPerson(name2)
            await greetings.countPerson(name3)

            const appUsers = await greetings.getAllUsers()
            assert.deepEqual([{name1 : "Teko"}], [{name2 : "Khanyisile"}] ,[{name3 : "Sizwe"}],appUsers);
        })
        it('should pass the db test', async function () {

            // the Factory Function is called CategoryService
            let categoryService = CategoryService(pool);
            await categoryService.add({
                description: "Diary"
            });

            let categories = await categoryService.all();
            assert.equal(1, categories.length);

        });




      
        //         it("should be able to find counter for times a person was greeted ", async function () {

        //             var name = "Kagiso"


        //             await greetings.verifyName(name)

        //             await greetings.verifyName(name)

        //             assert.deepEqual(2, await greetings.perPerson(name));
        //         });

        //         it("should be able to get counter for all greeted users", async function () {

        //             const name2 = "sphiwe";
        //             const name3 = "teko";
        //             const name4 = "charl";
        //             const name5 = "Mecayle";

        //             await greetings.verifyName(name5)
        //             await greetings.verifyName(name2)
        //             await greetings.verifyName(name3)
        //             await greetings.verifyName(name4)

        //             const allUsers = await greetings.allUsers()

        //             assert.deepEqual(4, await greetings.greetCount());
        //         });

        //         it("should be able to reset the dataBase", async function () {

        //             await greetings.verifyName('siya')
        //             await greetings.verifyName('Ayanda')

        //             const allUsers = await greetings.allUsers()

        //             assert.deepEqual([], await greetings.reset());
        //         });

        //         after(function () {
        //             pool.end();
        //         })
        //     });
        // })



        const assert = require('assert');
        const CategoryService = require('../services/category-service');
        const pg = require("pg");
        const Pool = pg.Pool;

        // we are using a special test database for the tests
        const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products_test';

        const pool = new Pool({
            connectionString
        });

        describe('The addNames function', function () {

            beforeEach(async function () {
                await pool.query(`delete from greetings`);
            });

            after(function () {
                pool.end();
            })
        });