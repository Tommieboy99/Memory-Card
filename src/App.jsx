import { useState, useEffect } from 'react'
import './App.css'

function App() {
  return (
    <>
    <MemoryGame/>
    </>
  )
}

function MemoryGame() {
  const [clickedCards, setClickedCards] = useState([]);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setCards] = useState(['pikachu', 'bulbasaur', 'charmander', 'snorlax', 'pidgeot', 'caterpie', 'igglybuff', 'onix', 'umbreon', 'seadra', 'wooper', 'tentacool'])

  function handleClick( name ) {

    if (!clickedCards.includes(name)) {
      setClickedCards(prev => [...prev, name])
      setCount(count => count + 1)
    } else {

      if (count > highScore) {
        setHighScore(count)
      }

      setCount(0)
      setClickedCards([])
    }

    setCards(prev => {
      const result = [...prev];

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      return result;
    });
  }

  return (
    <main className='main'>
      <div className='score-board'>
        <p>Score: {count}</p>
        <p>Highscore: {highScore}</p>
      </div>
      <div className='cardContainer'>
        {cards.map(card => <MemoryCard key={card} name={card} handleClick={() => handleClick(card)} />)}
      </div>
      <footer className='footer'>
        <p>Made by Tommieboy99</p>
      </footer>
    </main>
  )
}

function MemoryCard ( {name, handleClick} ) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setImgUrl(data.sprites.other.dream_world.front_default)
      })
      .catch(console.error)
  }, [name]);

  return (
    <button onClick={handleClick}>
      <img className='pokemonImage' src={imgUrl} alt="" /> 
    </button>
  )
}

export default App
