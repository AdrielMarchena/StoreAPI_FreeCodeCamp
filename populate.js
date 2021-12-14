/**
 * WARNING
 * 
 * This file is meant to be executed manualy, standalone, do not include this anywhere
 * It clears the Database and populates it again with some data for testing
 * 
 * WARNING
 */

 const readline = require("readline");
 const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
 });

require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

let execute = process.env.ENABLE_DATABASE_DELETE_THING || false;

async function EntryPoint()
{
    try
    {
        if(!execute)
        {
            console.log("ENABLE_DATABASE_DELETE_THING is not set to true on env file, skipping deleting everything");
            process.exit(0);
        }

        rl.question("Are you sure you want to do this? (Yy/Nn)",function(r)
        { 
            console.log(r);
            if(r == "Y" || r == "y")
            {
                execute = true; 
            }
            else 
                execute = false; 
        rl.close();
        });
        
        if(!execute)
        {
            process.exit(0);
            return;
        }
        
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Product.create(jsonProducts);
        console.log("You deleted all and replace it with the content in 'populate.js'");
        process.exit(0);
    }
    catch(error)
    {
        console.error(error);
        process.exit(1);
    }
}

EntryPoint();