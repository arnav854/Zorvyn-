import { Schema, model } from "mongoose";


const userSchema = new Schema({
    userId  : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    type : {
        type : String,
        enum : ["income", "expense"],
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now,
    },
}, {timestamps: true });

const FinancialRecord = model("FinancialRecord", userSchema);


export default FinancialRecord;