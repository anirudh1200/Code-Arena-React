const express = require('express');
const router = express.Router();
const Question = require("../models/questionsModel");

router.get("/question", async (req,res) =>{
    let questions;
    try{
        questions = await Question.find()
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to get questions from DB"});
        return;
    }
    res.status(200).send(questions);
});

router.post('/question', async (req, res) => {
    let data = req.body;
    let question = new Question(data);
    try {
        await question.save()
        res.send({isSaved: true});
    } catch(err) {
        res.send({isSaved: false, err})
    }
});

router.put('/question', async (req, res) => {
    let data = req.body;
    try{
        await Question.findByIdAndUpdate(data._id, data).exec();
        res.send({isSaved:true})
    } catch (e) {
        console.log(e);
        res.send({isSave:false})
    }
});

router.delete('/question', async (req, res) => {
    let {id} = req.body
    try{
        await Question.findByIdAndDelete(id).exec();
        res.send({status: 'success'})
    } catch(e) {
        console.log(e)
        res.send({status: 'error'})
    }
});

module.exports = router;