import { useState, useEffect } from 'react';
import './App.css';
import Screen from './assets/game/Screen';
import Actions from './assets/game/buttons/Actions';
import Dpad from './assets/game/buttons/Dpad';
import StartSelect from './assets/game/buttons/StartSelect';
import BattleScreen from './assets/game/BattleScreen';

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(0);
  const pageSize = 6;
  const [showBattle, setShowBattle] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [moves, setMoves] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);


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
    setSelectedIndex((prev) => (prev < pageSize - 1 ? prev + 1 : prev));
  };

  const handleLeft = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
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

  const handleSelect = () => {
    const player = currentPage[selectedIndex];
    if (player) {
      const playerMoves = player.moves
        .slice(0, 4)
        .map((m) => m.move.name.replace('-', ' '));
      setMoves(playerMoves);
      setSelectedMoveIndex(0);
      setSelectedPokemon(player);
      setShowBattle(true);
    }
  };

  const handleBattleUp = () => {
    setSelectedMoveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleBattleDown = () => {
    setSelectedMoveIndex((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const [battleAttack, setBattleAttack] = useState(() => () => {});
  const handleBattleA = () => {
    if (showBattle && typeof battleAttack === 'function') {
      battleAttack();
    } else {
    }
  };
  

  const start = pageIndex * pageSize;
  const currentPage = pokemones.slice(start, start + pageSize);

  return (
    <div className="gameboy">
      <Screen
        pokemones={currentPage}
        selectedIndex={selectedIndex}
        showBattle={showBattle}
        selectedPokemon={selectedPokemon}
        allPokemons={pokemones}
        onBattleEnd={() => setShowBattle(false)}
        moves={moves}
        selectedMoveIndex={selectedMoveIndex}
        onBattleUp={handleBattleUp}
        onBattleDown={handleBattleDown}
        onBattleA={handleBattleA}
        setBattleAttack={setBattleAttack} 
      />


      <div className="controls">
        <div className="top-buttons">
          <Dpad
            onLeft={!showBattle ? handleLeft : null}
            onRight={!showBattle ? handleRight : null}
            onUp={showBattle ? handleBattleUp : handleUp}
            onDown={showBattle ? handleBattleDown : handleDown}
          />
          <Actions
            onA={showBattle ? handleBattleA : null}
            onB={null}
          />
        </div>
        <StartSelect onSelect={handleSelect} />
        <div className="start-select-labels">
          <div className="select-label">SELECT</div>
          <div className="start-label">START</div>
        </div>
      </div>
    </div>
  );
}

export default App;
