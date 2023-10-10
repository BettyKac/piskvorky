import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'

// vybrání všech herních buttonu a přidání textového pole co nebude vidět, nastaveno pro všechny tlačítka na '_'.

const allbuttonsElement = document.querySelectorAll('.hra__pole')
allbuttonsElement.forEach((button) => {
  button.textContent = '_';
  button.style.color = 'transparent';
});
 
//rozšířeno o přidávání textového contentu po každém kliknutí na 'o','x'

const obrazekCircle = document.querySelector('.hra__obrazek--circle')
const zpracujKlikuti = (event) => {
  const button = event.target;
  button.disabled = true;
  event.target.classList.add(`board__field--${currentPlayer}`)
  
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    obrazekCircle.src = 'obrazky_hra/cross.svg';
    obrazekCircle.alt = 'cross';
    button.textContent = 'o'
      } else {
    currentPlayer = 'circle';
    obrazekCircle.src = 'obrazky_hra/circle.svg';
    obrazekCircle.alt = 'circle';
    button.textContent = 'x'
  }
  //DOM element vybraný pomoci All převeden na pole a přidána fce findWinner s bonusem

  const herniPole = Array.from(allbuttonsElement)
  const textPole = herniPole.map((button) => { return button.textContent 
  })
 
  const vitez = findWinner(textPole)
  if (vitez === 'o' || vitez === 'x') {
    const endWinner = () => {
      alert(`Vyhrál hráč se symbolem: ${vitez}!`)
      window.location.reload()
  }
      setTimeout(endWinner, 500)
   
    } else if (vitez === 'tie') {
    const endTie = () => {alert('Hra skončila remízou.')
    window.location.reload()
    }
    setTimeout(endTie, 500)
  }
  // console.log(textPole) - pro kontrolu změn v herním poli
}

allbuttonsElement.forEach((button) => 
button.addEventListener('click', zpracujKlikuti)
)


//reset
const hraRestart = document.querySelector('.hra__button--restart')


hraRestart.addEventListener('click', (event) => {
  const userConfirmed = confirm('Opravdu chceš začít znovu?');
  if (userConfirmed === false) {
      event.preventDefault();
  } 
});
