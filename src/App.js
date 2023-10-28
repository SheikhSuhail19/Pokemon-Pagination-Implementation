import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

function App() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon");
  const [ nextPageUrl, setNextPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
  const [ prevPageUrl, setPrevPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);

    let controller = new AbortController();

    fetch(currentPageUrl, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setPokemon(data.results.map((p) => p.name));
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request was canceled');
        } else {
          console.error('Error:', error);
        }
      });

    return () => controller.abort();
  }, [ currentPageUrl ]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={ pokemon } />
      <Pagination
        gotoNextPage={ nextPageUrl ? gotoNextPage : null }
        gotoPrevPage={ prevPageUrl ? gotoPrevPage : null }
      />
    </>
  );
}

export default App;
