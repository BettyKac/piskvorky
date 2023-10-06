let currentPlayer = 'circle'
const obrazekCircle = document.querySelector('.hra__obrazek--circle')
const zpracujKlikuti = (event) => {
  event.target.disabled = true
  event.target.classList.add(`board__field--${currentPlayer}`)
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    obrazekCircle.src = 'obrazky_hra/cross.svg';
    obrazekCircle.alt = 'cross';
  } else {
    currentPlayer = 'circle';
    obrazekCircle.src = 'obrazky_hra/circle.svg';
    obrazekCircle.alt = 'circle';
  }
}

document.querySelector('button:nth-child(1)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(2)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(3)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(4)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(5)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(6)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(7)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(8)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(9)').addEventListener('click', zpracujKlikuti)
document.querySelector('button:nth-child(10)').addEventListener('click', zpracujKlikuti)

// bonus
const hraRestart = document.querySelector('.hra__button--restart')


hraRestart.addEventListener('click', (event) => {
  const userConfirmed = confirm('Opravdu chceš začít znovu?');
  if (userConfirmed === false) {
      event.preventDefault();
  } 
});
