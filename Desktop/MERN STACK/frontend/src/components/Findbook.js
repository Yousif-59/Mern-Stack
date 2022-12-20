import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const BookIDForm = () =>{
  const{dispatch} = useWorkoutsContext()
  const [id, setID] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [error,Seterror] = useState(null)
  

  const getBook = async (e) =>{
    e.preventDefault()
    const book = {id}
    const responce = await fetch('/api/workouts/'+ id,{
      method: 'GET'
    }
    )
    const json = await responce.json()
    if(!responce.ok){
      Seterror(json.error)
      console.log(error)
    }
    else{
      setID('')
      setTitle (json.title)
      setAuthor(json.author)
      
      Seterror(null)
      console.log('got book', json)
      alert(JSON.stringify(json))
    }
  }

  return(
    <form className="click to make book pop up" onSubmit={getBook}>

      <h3>get book</h3>

      <label>book id: </label>
      <input 
        type="text" 
        onChange={(e)=> setID(e.target.value)}
        value={id}
      />
    <button>get Book</button>
    
    <p1> {title} </p1>
    <p1>{author} </p1>

    {error && <div className="error">{error}</div>}
    </form>

  )

}

export default BookIDForm
 