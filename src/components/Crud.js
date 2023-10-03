import React,{ useState } from 'react'
import Notes from './Notes'
import NoteModel from './NoteModel'
import nanoid from 'nanoid';

export default function Crud() {
  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({content: ''})

  const handleSubmit = (e) => { // добавление
    e.preventDefault();
    const newNote = new NoteModel(nanoid(), form.content)
    setNotes(prevNotes => [...prevNotes, newNote])
    setForm({content: ''})
  }

  const handleChange = (e) => {
    const {value} = e.target
    setForm(prev => ({...prev, content: value}))
  }

  const loadActualNotes = () => { // обновление
    fetch(`${process.env.REACT_APP_API_URL}`)
    .then(response => response.json()) 
    .then(arr => arr.map(el => setNotes(prevNotes => [...prevNotes, el])))
  }

  const loadNotes = () => { // загрузка 
    console.log(process.env.REACT_APP_API_URL)
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(response => response.json()) 
    .then(arr => arr.map(el => setNotes(prevNotes => [...prevNotes, el])))
  }

  const handleDelete = id => { // удаление
    fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(body => {
      let urlId = body.url.split('/')
      return urlId[urlId.length - 1]
    })
    .catch(err => console.log(`Err ${err}`))
    .then(id => setNotes(prevNotes => prevNotes.filter( o => o.id !== id)))
  }

  return (
    <div onLoad={loadNotes}>
      <form onSubmit={handleSubmit} className="form">
        <span>
          <h1>Notes</h1>
          <button type="button" onClick={loadActualNotes} className="update">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
          </svg>
          </button>
        </span>
        <span>
          <textarea value={form.content} onChange={handleChange} rows="7" cols="50"/>
          <button className="send">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />{" "}
            </svg>
          </button>   
        </span>
      </form>

      <div className="notes">
        <Notes notes={notes} handleDelete={handleDelete}/>
      </div>
  </div>
  )
}