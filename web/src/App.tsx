import { Habit } from './components/habits'
import './style/global.css';

function App() {

  return (
    <div className="App">
      <Habit completed={3} />
      <Habit completed={3} />
      <Habit completed={3} />
      <Habit completed={3} />
    </div>
  )
}

export default App
