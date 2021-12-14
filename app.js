require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products")

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//Mid
app.use(express.json());

//Routes
app.get("/",(request,response)=>
{
    response.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products",productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

async function EntryPoint()
{
    try
    {
        //Connect to DB
        await connectDB(process.env.MONGO_URI);
        //Run Server
        app.listen(port,console.log(`Server is listening on port ${port} :)`));
    }
    catch(error)
    {
        console.error(error);
    }
}

EntryPoint();