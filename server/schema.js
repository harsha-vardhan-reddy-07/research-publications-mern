import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    usertype: {type: String},
    domain: {type: String},
    qualification: {type: String}
});

const publication = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    authorId: {type: String},
    description: {type: String},
    bannerImg: {type: String},
    domain: {type: String},
    keywords: {type: Array},
    publishedDate: {type: String},
    pdfFileName: {type: String},
    evaluator: {type: String},
    evaluatorId: {type: String},
    evaluationDate: {type: String},
    evaluationNote: {type: String},
    status: {type: String, default: "pending"},
});

export const User = mongoose.model("users", userSchema);
export const Publication = mongoose.model("publications", publication);