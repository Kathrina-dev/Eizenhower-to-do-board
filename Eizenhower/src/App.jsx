import { useState } from 'react'
import './App.css'
import { Todo } from './to-do'

function App() {
  const [urgency, setUrgency] = useState();
  const [importance, setImportance] = useState();

  return (<>
      <p>Urgent</p>
      <p>Not Urgent</p>
      <p>Important</p>
      <p>Not Important</p>
      <div className='matrix'>
        <Todo urgency="Urgent" importance="Important" />
        <Todo urgency="Not Urgent" importance="Important" />
        <Todo urgency="Urgent" importance="Not Important" />
        <Todo urgency="Not Urgent" importance="Not Important" />
      </div>  
  </>
  )
}

export default App

