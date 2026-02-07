const express = require('express');
const noteModel = require('./models/notes.model');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
const path = require('path')

app.use(express.static("./public")) // middlewear to get js and css files from public folder

// .create() -> will create collection of data
app.post("/notes", async (req, res) => {
    const { title, description, age } = req.body
    const note = await noteModel.create({
        title, description, age
    })

    res.status(201).json({
        message: "note created succesfully",
        note
    })
})


// .find() -> will only return array of objects
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "notes fetched succesfully",
        notes
    })
})

// .findByIdAndDelete() -> will delete the document by id
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "note deleted succesfully"
    })
})


//patch -> will update one element of document by id
app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, {
        description
    })

    res.status(200).json({
        message: "note updated succesfully"
    })
})


//put -> will update the document by id
app.put("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, age } = req.body

    await noteModel.findByIdAndUpdate(id, {
        title, description, age
    })
    res.status(200).json({
        message: "note updated succesfully"
    })
})

// console.log(__dirname)
app.use('*name', (req, res) => {
    // res.send("This is wildcard route")
    res.sendFile(path.join(__dirname,'..','public/index.html'))
})

module.exports = app;