import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    //const [load, setLoad] = useState('')
    //const [reps, setReps] = useState('')
    const [id, setId] = useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setIsbn] = useState('')
    const [author, setAuthor] = useState('')
    const [who, setWho] = useState('')
    const [due, setDue] = useState('')
    const [avail, setAvail] = useState('')
    //const [publisher, setPublisher] = useState('')


    const [error, setError] = useState(null)
    
const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title,id,author,publisher,isbn, due, who, avail}

    const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }
    if(response.ok){
        setTitle('')
        //setLoad('')
        //setReps('')
        setAuthor('')
        setId('')
        setPublisher('')
        setIsbn('')
        setDue('')
        setWho('')
        setAvail('')
        //setPublisher('')
        setError(null)
        console.log('new workout added', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
}

    return (
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new book</h3>

        <label>Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>id:</label>
        <input 
            type="number" 
            onChange={(e) => setId(e.target.value)}
            value={id}
        />

        <label>author:</label>
        <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
        />

        <label>publisher</label>
        <input 
            type="text" 
            onChange={(e) => setPublisher(e.target.value)}
            value={publisher}
        />

        <label>isbn</label>
        <input 
            type="text" 
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
        />

        <label>avail</label>
        <input 
            type="text" 
            onChange={(e) => setAvail(e.target.value)}
            value={avail}
        />

        <label> who:</label>
        <input 
            type="text" 
            onChange={(e) => setWho(e.target.value)}
            value={who}
        />

        <label>due:</label>
        <input 
            type="number" 
            onChange={(e) => setDue(e.target.value)}
            value={due}
        />

        <button>Add Books</button>
        {error && <div className="error">{error}</div>}
        </form>

    )
}

export default WorkoutForm