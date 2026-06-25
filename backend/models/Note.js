//Here we will define what a note is and how it will be stored in the database.and what kind of properties of our note will have.
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{ //"This field will contain the ID of a User."
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

const Note = mongoose.model("Note",noteSchema);
export default Note;