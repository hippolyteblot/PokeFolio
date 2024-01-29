// Main.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../../App.css';
import Header from "../../components/Header/Header";

const Main = () => {
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        let timeoutId;

        const fetchPokemon = async () => {
            try {
                if (searchTerm.trim() === '') {
                    setPokemonList([]);
                    return;
                }
                setWaitingForResponse(true);
                const response = await
                    fetch(`https://api.pokemontcg.io/v2/cards?q=name:*${searchTerm}*`);
                const data = await response.json();
                const cards = data.data.map(card => ({
                    id: card.id,
                    name: card.name,
                    imageUrl: card.images.small,
                }));

                // Update the list of Pokémon
                setPokemonList(cards);
                setWaitingForResponse(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Wait 500ms after the last keystroke before making the request
        timeoutId = setTimeout(fetchPokemon, 500);

        // Clean up the timeout
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const pairsOfCards = [];
    for (let i = 0; i < pokemonList.length; i += 2) {
        const pair = pokemonList.slice(i, i + 2);
        pairsOfCards.push(pair);
    }

    return (
        <div className="main-container">
            <Header />
            <h2>Search for a card</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search in your collection"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Filters</button>
            </div>

            <div className="pokemon-container">
                {pairsOfCards.map((pair, index) => (
                    <div key={index} className="card-pair">
                        {pair.map(pokemon => (
                            <Link key={pokemon.id} className="pokemon-card" to={`/card-viewer/${pokemon.id}`}>
                                <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image-small" />
                                <p>{pokemon.name}</p>
                            </Link>
                        ))}
                    </div>
                ))}
                {pokemonList.length === 0 && !waitingForResponse && (
                    <p className="no-results">No results</p>
                )}
            </div>
        </div>
    );
};

export default Main;
