import { application } from "express";
import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoos.Schema({
    job:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending'
    }
},{timestamps:true});

export const Application = mongoose.model('Application',applicationSchema);