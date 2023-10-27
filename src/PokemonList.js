import React from 'react';
import Pokemon from 'pokemon-images';
import './style.css';

export default function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-container">
      { pokemon.map(p => {
        let pokeImageLink = Pokemon.getSprite(p);

        return (
          <div key={ p } className="pokemon-item">
            <img src={ pokeImageLink } alt={ `Pokemon: ${ p }` } />
            <h3>{ p }</h3>
          </div>
        );
      }) }
    </div>
  );
}
