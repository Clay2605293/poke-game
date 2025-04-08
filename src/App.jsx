import { useState, useEffect } from 'react';
import './App.css';
import Screen from './assets/game/Screen';
import Actions from './assets/game/buttons/Actions';
import Dpad from './assets/game/buttons/Dpad';
import StartSelect from './assets/game/buttons/StartSelect';

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [pageIndex, setPageIndex] = useState(0); 
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const pageSize = 6;

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );
      setPokemones(detailed);
    };

    fetchPokemons();
  }, []);

  const maxPage = Math.floor(pokemones.length / pageSize);

  const handleRight = () => {
    setSelectedIndex((prev) => {
      if (prev < pageSize - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };
  

  const handleLeft = () => {
    setSelectedIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
  

  const handleUp = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
      setSelectedIndex(0);
    }
  };

  const handleDown = () => {
    if (pageIndex < maxPage) {
      setPageIndex((prev) => prev + 1);
      setSelectedIndex(0);
    }
  };

  const start = pageIndex * pageSize;
  const currentPage = pokemones.slice(start, start + pageSize);

  return (
    <div className="gameboy">
      <Screen pokemones={currentPage} selectedIndex={selectedIndex} />
      <div className="controls">
        <div className="top-buttons">
          <Dpad
            onLeft={handleLeft}
            onRight={handleRight}
            onUp={handleUp}
            onDown={handleDown}
          />
          <Actions />
        </div>
        <StartSelect />
      </div>
    </div>
  );
}

export default App;
