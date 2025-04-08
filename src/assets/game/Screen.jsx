import './styles.css';
const Screen = ({ pokemones, selectedIndex }) => {
  return (
    <div className="screen-border">
      <div className="screen">
        {pokemones.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="pokemon-grid">
            {pokemones.map((pokemon, i) => (
              <div
                key={pokemon.id}
                className={`pokemon-card ${
                  selectedIndex === i ? 'selected' : ''
                }`}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pokemon-sprite"
                />
                
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="logo">
        <span id="logo-GameBoy">GAME BOY &nbsp;</span>
        <span id="logo-C">C</span>
        <span id="logo-O1">O</span>
        <span id="logo-L">L</span>
        <span id="logo-O2">O</span>
        <span id="logo-R">R</span>
      </div>
    </div>
  );
};

export default Screen;


