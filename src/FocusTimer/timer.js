import state from './state.js'
import * as elements from './elements.js'
import { reset } from './actions.js'
import { kitchenTimerAudio } from './sounds.js'

export function countdown() {

  /* Limpar o acúmulo de setTimeout para evitar problemas com a aceleração do cronômetro*/
  clearTimeout(state.countdownID)

  if(!state.isRunning) {
    return
  }

  let minutes = Number(elements.minutes.textContent)
  let seconds = Number(elements.seconds.textContent)

  seconds--

  if(seconds < 0) {
    seconds = 59
    minutes--
  }

  if(minutes < 0 ) {
    reset()
    kitchenTimerAudio.play()
    return    
  }

  updateDisplay(minutes, seconds)

  state.countdownID = setTimeout(() => countdown(), 1000)
}

export function updateDisplay(minutes, seconds) {
  /* ?? = nullish coalescing operator 
    Se minutes for null, pega o valor de state.minutes */
  minutes = minutes ?? state.minutes
  seconds = seconds ?? state.seconds

  elements.minutes.textContent = String(minutes).padStart(2, '0')
  elements.seconds.textContent = String(seconds).padStart(2, '0')
}