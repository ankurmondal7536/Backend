const express = require('express');
const noteModel = require('./models/notes.model');
const app = express();
app.use(express.json())



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


//patch -> will update the document by id
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

module.exports = app;