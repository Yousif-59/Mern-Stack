import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const UpdatebookForm = () =>{
  const{ dispatch } = useWorkoutsContext()

  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [isbn, setIsbn] = useState('')
  const [avail, setAvail] = useState(true)
  const [who, setWho] = useState('')
  const [due, setDue] = useState('')
  const [error,Seterror] = useState(null)
  
  const handleUpdate = async (e) =>{
    e.preventDefault()
    const book = {id,title,author,publisher,isbn,avail,who,due}
    const responce = await fetch('/api/workouts/'+ book.id,{
      method: 'PATCH',
      body: JSON.stringify(book),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    )
    const json = await responce.json()
    if(!responce.ok){
      Seterror(json.error)
      console.log(error)
    }
    else{
      setID('')
      setTitle('')
      setAuthor('')
      setPublisher('')
      setIsbn('')
      setWho('')
      Seterror(null)
      console.log('book updated', json)

    }
  }

  return(
    <form className="update" onSubmit={handleUpdate}>

      <h3>update book</h3>

      <label>book id: </label>
      <input 
        type="text" 
        onChange={(e)=> setID(e.target.value)}
        value={id}
      />
      
      <label>book title: </label>
      <input 
        type="text" 
        onChange={(e)=> setTitle(e.target.value)}
        value={title}
      />

      <label>book author: </label>
      <input 
        type="text" 
        onChange={(e)=> setAuthor(e.target.value)}
        value={author}
      />
      <label>book publisher: </label>
      <input 
        type="text" 
        onChange={(e)=> setPublisher(e.target.value)}
        value={publisher}
      />
     <label>book isbm: </label>
      <input 
        type="text" 
        onChange={(e)=> setIsbn(e.target.value)}
        value={isbn}
      />

    <button>update Book</button>
    {error && <div className="error">{error}</div>}
    </form>

  )

}

export default UpdatebookForm