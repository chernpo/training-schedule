import { useEffect } from 'react'
import { getTrainingLessons } from './api/trainingApi'

function App() {
  useEffect(() => {
    getTrainingLessons().then((lessons) => console.log('lessons:', lessons))
  }, [])

  return <div>Checking console for mock training lessons…</div>
}

export default App