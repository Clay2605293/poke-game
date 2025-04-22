import { useEffect, useState } from 'react';
import './BattleScreen.css';

const getRandomEnemy = (allPokemons, player) => {
  const options = allPokemons.filter((p) => p.name !== player.name);
  return options[Math.floor(Math.random() * options.length)];
};

const BattleScreen = ({
  player,
  allPokemons,
  onBattleEnd,
  moves,
  selectedMoveIndex,
  onBattleUp,
  onBattleDown,
  setBattleAttack,
}) => {
  const [enemy, setEnemy] = useState(null);
  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [logStep, setLogStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAttack = () => {
    if (isProcessing || !enemy) return;

    setIsProcessing(true);

    const playerMove = moves[selectedMoveIndex];
    const damageToEnemy = Math.floor(Math.random() * 31) + 10;
    const damageToPlayer = Math.floor(Math.random() * 31) + 10;
    const enemyMove = enemy.moves[Math.floor(Math.random() * enemy.moves.length)].move.name.replace('-', ' ');

    const initialLog = [
      `${player.name.toUpperCase()} uses ${playerMove.toUpperCase()}!`,
      `It did ${damageToEnemy} damage!`,
      `${enemy.name.toUpperCase()} uses ${enemyMove.toUpperCase()}!`,
      `It did ${damageToPlayer} damage!`,
    ];

    const newEnemyHP = Math.max(0, enemyHP - damageToEnemy);
    const newPlayerHP = Math.max(0, playerHP - damageToPlayer);

    let winnerMessage = null;
    if (newEnemyHP === 0 || newPlayerHP === 0) {
      winnerMessage =
        newEnemyHP === 0 && newPlayerHP === 0
          ? "It's a draw!"
          : newEnemyHP === 0
          ? `${player.name.toUpperCase()} wins!`
          : `${enemy.name.toUpperCase()} wins!`;
    }

    const fullLog = winnerMessage ? [...initialLog, winnerMessage] : initialLog;

    setBattleLog(fullLog);
    setLogStep(0);

    const interval = setInterval(() => {
      setLogStep((prev) => {
        const next = prev + 1;
        if (next === fullLog.length) {
          clearInterval(interval);

          setEnemyHP(newEnemyHP);
          setPlayerHP(newPlayerHP);
          setIsProcessing(false);

          if (winnerMessage) {
            setTimeout(() => {
              onBattleEnd();
            }, 2000);
          }

          return prev;
        }
        return next;
      });
    }, 1000);
  };

  useEffect(() => {
    if (enemy && typeof setBattleAttack === 'function') {
      setBattleAttack(() => () => handleAttack());
    }
  }, [enemy, playerHP, enemyHP, setBattleAttack]);

  useEffect(() => {
    const chosen = getRandomEnemy(allPokemons, player);
    setEnemy(chosen);
    setPlayerHP(player.stats[0].base_stat);
    setEnemyHP(chosen.stats[0].base_stat);
  }, [player, allPokemons]);

  if (!enemy || !Array.isArray(moves)) {
    return <p>Loading battle...</p>;
  }

  return (
    <div className="battle-screen">
      <div className="battle-zone">
        <div className="enemy-info">
          <p>{enemy.name.toUpperCase()}</p>
          <div className="hp-bar">
            <div
              className="hp-fill"
              style={{
                width: `${(enemyHP / enemy.stats[0].base_stat) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="enemy-sprite">
          <img src={enemy.sprites.front_default} alt={enemy.name} />
        </div>

        <div className="player-sprite">
          <img src={player.sprites.back_default} alt={player.name} />
        </div>

        <div className="player-info">
          <p>{player.name.toUpperCase()}</p>
          <div className="hp-bar">
            <div
              className="hp-fill"
              style={{
                width: `${(playerHP / player.stats[0].base_stat) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="text-zone">
        {isProcessing ? (
          <p className="battle-text">{battleLog[logStep]}</p>
        ) : (
          <ul className="move-list">
            {moves.map((move, index) => (
              <li
                key={move}
                className={index === selectedMoveIndex ? 'selected-move' : ''}
                onClick={() => {
                  if (isProcessing) return;
                  if (index > selectedMoveIndex) onBattleDown();
                  else if (index < selectedMoveIndex) onBattleUp();
                }}
              >
                {index === selectedMoveIndex ? '▶ ' : ''}
                {move.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BattleScreen;
