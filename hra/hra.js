import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'
let gameEnded = false;


const allbuttonsElement = document.querySelectorAll('.hra__pole')
allbuttonsElement.forEach((button) => {
  button.textContent = '_';
  button.style.color = 'transparent';
});
 
const makeAiMove = async (textPole) => {
   allbuttonsElement.forEach((button) => {
    button.disabled = true;
  });

  const enableEmptyFields = () => {
    allbuttonsElement.forEach((button, index) => {
      if (textPole[index] !== 'o' && textPole[index] !== 'x') {
        button.disabled = false;
      }
    });
  };

  const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      board: textPole,
      player: 'x',
    }),
  });
  
  const data = await response.json();
  const { x, y } = data.position;
  const field = allbuttonsElement[x + y * 10];
  enableEmptyFields();
  field.click();
};


const obrazekCircle = document.querySelector('.hra__obrazek--circle')
const zpracujKlikuti = async (event) => {
  if (gameEnded) return; 

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

  const herniPole = Array.from(allbuttonsElement)
  const textPole = herniPole.map((button) => { return button.textContent 
  })
 
  const vitez = findWinner(textPole)
  if (vitez === 'o' || vitez === 'x') {
    gameEnded = true;
    const endWinner = () => {
      alert(`Vyhrál hráč se symbolem: ${vitez}!`)
      window.location.reload()
  }
      setTimeout(endWinner, 500)
   
    } else if (vitez === 'tie') {
    gameEnded = true;
    const endTie = () => {alert('Hra skončila remízou.')
    window.location.reload()
    }
    setTimeout(endTie, 500)
  }
  if (currentPlayer === 'cross' && !gameEnded) {
    await makeAiMove(textPole);
  }
}

allbuttonsElement.forEach((button) => 
button.addEventListener('click', zpracujKlikuti)
)


const hraRestart = document.querySelector('.hra__button--restart')


hraRestart.addEventListener('click', (event) => {
  const userConfirmed = confirm('Opravdu chceš začít znovu?');
  if (userConfirmed === false) {
      event.preventDefault();
  } 
});
