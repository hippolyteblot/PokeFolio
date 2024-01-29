// Main.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../../App.css';
import './Main.css';
import Header from "../../components/Header/Header";

const Main = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const { userId } = 1;

    const [userCards, setUserCards] = useState([]);

    const getUserCards = async (userId) => {
        const request = await fetch(`http://127.0.0.1:3000/card/get-user-cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        });
        const dataFromDb = await request.json();
        const data = dataFromDb.cards;
        // Ask tcg api for each card
        const tcgCards = [];
        for (let i = 0; i < data.length; i++) {
            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${data[i]}`);
            const card = await response.json();
            tcgCards.push(card.data);
        }
        // Create cards object
        const cards = tcgCards.map(card => ({
            id: card.id,
            name: card.name,
            imageUrl: card.images.small,
        }));
        return cards;
    }

    useEffect(() => {
        const fetchUserCards = async () => {
            try {
                const cards = await getUserCards(1);
                setUserCards(cards);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserCards();
    }, []);  // Effectué au montage, pas besoin de dépendances

    useEffect(() => {
        let timeoutId;

        const fetchPokemon = () => {
            try {
                if (searchTerm.trim() === '') {
                    console.log("search term is empty");
                    console.log(userCards);
                    setPokemonList(userCards);
                    return;
                }
                // Search in local cards
                const filteredCards = userCards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
                setPokemonList(filteredCards);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        timeoutId = setTimeout(fetchPokemon, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, userCards]);

    const pairsOfCards = [];
    for (let i = 0; i < pokemonList.length; i += 2) {
        const pair = pokemonList.slice(i, i + 2);
        pairsOfCards.push(pair);
    }

    return (
        <div className="main-container">
            <Header />
            <h2>Your card collection</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search in your collection"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Add card</button>
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
            </div>
        </div>
    );
};

export default Main;