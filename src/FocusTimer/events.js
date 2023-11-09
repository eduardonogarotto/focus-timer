import { controls } from './elements.js'
import * as actions from './actions.js'
import * as elements from './elements.js'
import state from './state.js'
import { updateDisplay } from './timer.js'

export function registerControls() {
  controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action

    if(typeof actions[action] != 'function') {
      return
    }

    actions[action]()
})
}

export function setMinutes() {
  elements.minutes.addEventListener('focus', () => {
    elements.minutes.textContent = ''
  })

  /* Tratamento para entrada apenas de valores numéricos 
   onkeypress é um evento que é disparado quando uma tecla do tipo caractere (números, letras ou pontuações) é pressionada  
   Expressão regular: onde /\d/ equivale a /[0-9]/, ou seja, apenas números.
   .test(event.key) verifica se a tecla pressionada equivale a um número (/\d/).
    Se sim, retorna verdadeiro, caso contrário, falso. 
  */
  elements.minutes.onkeypress = (event) => /\d/.test(event.key) 

  /* Tratamento para que os minutos sejam limitados a 60 minutos, independente se o usuário inserir um valor maior
    Blur é ao contrário do focus.
    */
  elements.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent
    time =  time > 60 ? 60 : time

    state.minutes = time
    state.seconds = 0

    updateDisplay()
    elements.minutes.removeAttribute('contenteditable')
  }  
  )
}