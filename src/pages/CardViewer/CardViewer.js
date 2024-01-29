import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import {useAuth} from "../../AuthContext";
import '../../App.css';
import './CardViewer.css';

const CardViewer = () => {
    const { id } = useParams();
    const { userId } = useAuth();

    const [cardDetails, setCardDetails] = useState({
        name: '',
        imageUrl: '',
        price: 0,
        rarity: '',
    });

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
                const data = await response.json();

                const { name, images, tcgplayer, rarity } = data.data;

                setCardDetails({
                    name,
                    imageUrl: images.large || null,
                    priceHolofoil: tcgplayer?.prices?.holofoil?.market || null,
                    priceReverseHolofoil: tcgplayer?.prices?.reverseHolofoil?.market || null,
                    priceNormal: tcgplayer?.prices?.normal?.market || null,
                    rarity,
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCardDetails();
    }, [id]);

    const handleAddToCollection = async () => {
        try {
            console.log(userId, id);
            const response = await fetch('http://127.0.0.1:3000/card/add-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, cardId: id }),
            });

            if (response.ok) {
                console.log('Card added to collection');
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="main-container">
            <Header />
            <h2>{cardDetails.name}</h2>
            <div className="card-details">
                <img src={cardDetails.imageUrl} alt={cardDetails.name + '(' + id + ')'} className="card-image"/>
                <div className={"card-info"}>
                    <div className="divider"/>
                    <p>Rarity: {cardDetails.rarity}</p>
                    <div className="divider"/>
                    <p>Card Prices</p>
                    {cardDetails.priceHolofoil && <p className="price-item">Holofoil: {cardDetails.priceHolofoil}$</p>}
                    {cardDetails.priceReverseHolofoil &&
                        <p className="price-item">Reverse Holofoil: {cardDetails.priceReverseHolofoil}$</p>}
                    {cardDetails.priceNormal && <p className="price-item">Normal: {cardDetails.priceNormal}$</p>}
                    <div className="divider"/>
                    <button className="add-to-collection-button" onClick={handleAddToCollection}>
                        Add to Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardViewer;
