import { useState } from 'react'
import './App.css'
import Screen from './assets/game/Screen'
import Actions from './assets/game/buttons/Actions'
import Dpad from './assets/game/buttons/Dpad'
import StartSelect from './assets/game/buttons/StartSelect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div class="gameboy">
          <Screen />
          <div class="controls">
            <div class="top-buttons">
              <Dpad />
              <Actions />
            </div>
            <StartSelect />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
