let assert = require("assert");
let Greeting = require('../greetings')


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://teko:teko123@localhost:5432/greetings';
    const pool = new Pool({
        connectionString
    });


    var greetings = Greeting(pool);


    describe('The addNames function',async function () {

        beforeEach(async function () {
            await pool.query(`delete from greetings`);
        });

        it("should add any name when greeted onto the database",async function(){

            var name = "Teko";

            await greetings.addNames(name)
            
            assert.deepEqual([{ name:"Teko"}], await greetings.getAllUsers())

        });
         
        it("should add more than one name on the database",async function(){
            
            var name1 = "Teko";
            var name2 = "Khanyisile";
            var name3 = "Sizwe";

            await greetings.addNames(name1)
            await greetings.addNames(name2)
            await greetings.addNames(name3)
        
            assert.deepEqual([{name : "Khanyisile"}],[{name : "Khanyisile"}] ,[{name : "Sizwe"}],await greetings.getAllUsers());
        });
         it("should be able to add on the counter when someone is greeted",async function(){

            var name1 = "Kagiso";
            var name2 = "Nkateko";
            var name3 = "Siphiwe";
            var name4 = "Godly";
            var name5 = "Travis";

      
            await greetings.addNames(name1);
            await greetings.addNames(name2);
            await greetings.addNames(name3);
            await greetings.addNames(name4);
            await greetings.addNames(name5);


            await greetings.getAllUsers()

            assert.deepEqual(5, await greetings.greetCount());
        });
            it("should be able to reset the dataBase", async function () {

                await greetings.addNames('Siliziwe')
                await greetings.addNames('Faye')
    
                const theUsers = await greetings.getAllUsers()
    
                assert.deepEqual([], await greetings.reset());
            });
            it('counter should remain constant if name is addes twice a', async function(){
            
              await greetings.addNames('Faye', 'English');
              await greetings.addNames('Faye', 'French');
            
              await assert.equal(await greetings.greetCount(), 1);
            })
            
                after(function () {
                    pool.end();
                });
            });
        