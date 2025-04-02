import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div class="gameboy">

          <div class="screen-border">
            <div class="screen">
            </div>
            <div id="logo">
              <span id="logo-GameBoy">GAME BOY &nbsp; </span>
              <span id="logo-C">C</span>
              <span id="logo-O1">O</span>
              <span id="logo-L">L</span>
              <span id="logo-O2">O</span>
              <span id="logo-O2">R</span>
            </div>
          </div>

          <div class="controls">

            <div class="top-buttons">


              <div class="dpad">
                <div></div>
                <div class="dpad-button up"></div>
                <div></div>
                <div class="dpad-button left"></div>
                <div class="dpad-button center"></div>
                <div class="dpad-button right"></div>
                <div></div>
                <div class="dpad-button down"></div>
                <div></div>
              </div>



              <div class="buttons">
                <div class="button a">A</div>
                <div class="button b">B</div>
              </div>


            </div>


            <div class="start-select">
              <div class="select"></div>
              <div class="start"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
