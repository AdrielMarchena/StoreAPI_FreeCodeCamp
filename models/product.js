const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true,"Product must have a name!"]
        },
        price:
        {
            type:Number,
            required:[true,"Product must have a price!"]
        },
        featured:
        {
            type:Boolean,
            default:false
        },
        rating:
        {
            type:Number,
            default:4.5
        },
        createAt:
        {
            type:Date,
            default: Date.now()
        },
        company:
        {
            type:String,
            enum:
            {
                values:["ikea","liddy","caressa","marcos"],
                message:"The company {VALUE} is not supported"
            }
        }
    });

    module.exports = mongoose.model("Product",productSchema);