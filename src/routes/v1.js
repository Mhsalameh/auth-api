'use strict';

const express = require('express');

const router = express.Router()
const modelFinder= require("../middleware/modelFinder")


router.param('model', modelFinder);
//requests
router.post("/:model", addModel);
router.get("/:model", getModel);
router.get("/:model/:id", getOneModel);
router.put("/:model/:id", updateModel);
router.delete("/:model/:id", deleteOneModel);

//request handlers
async function addModel(req,res){
    let reqBody = req.body;
    let addedModel= await req.model.createNewRecord(reqBody);
    res.status(201).json(addedModel);
}

async function getModel(req,res){
    res.status(200).json(await req.model.readRecord())
}

async function getOneModel(req,res){
   const id=req.params.id;
    res.status(200).json(await req.model.readRecord(id))
}
async function updateModel(req,res){
    const id = req.params.id;
    const reqBody=req.body;
    res.status(201).json(await req.model.updateRecord(id,reqBody));
}

async function deleteOneModel(req,res){
    const id= req.params.id;
    res.status(200).json(await req.model.deleteRecord(id))
}

module.exports = router;