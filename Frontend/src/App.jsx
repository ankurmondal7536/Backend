import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {


  const [notes, setNotes] = useState([])

  function getNotes() {
 
      axios.get("http://localhost:3000/notes")
        .then(res => {
          setNotes(res.data.notes)
          // console.log(res.data.notes)
        })
   
  }
  useEffect(() => {
    getNotes()
  }, [])

  function SubmitHandler(e) {
    e.preventDefault()
    const { title, description, age } = e.target.elements
    console.log(title.value, description.value, age.value)
    axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value,
      age: age.value
    }).then(res => {
      // console.log(res.data)
      getNotes()
    })
  }


   function DeleteHandler(noteId){

    axios.delete("http://localhost:3000/notes/"+noteId).then(res=>{
      console.log(res.data)
      getNotes()
    })
   }

   function ModifyHandler(noteId){
    const newTitle = prompt("Enter new title")
    const newDescription = prompt("Enter new description")
    const newAge = prompt("Enter new age")
    axios.put("http://localhost:3000/notes/"+noteId,{
      title: newTitle,
      description: newDescription,
      age: newAge
    }).then(res=>{
      console.log(res.data)
      getNotes()
    })
   }

  return (
    <>
      <form className='create-note-form' onSubmit={SubmitHandler}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <input name='age' type="number" placeholder='Enter Age' />
        <button>Create Note</button>
      </form>


      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <h3>{note.age}</h3>
              <button onClick={()=>{DeleteHandler(note._id)}} >delete Note</button>
              <button onClick={()=>{ModifyHandler(note._id)}} >Modify Note</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
