import React, {useEffect} from 'react';
import '../components/favoritesCharactersPage/styles/favoritesCharacters.scss'
import FavoritesCharacters from "../components/favoritesCharactersPage/FavoritesCharacters";
import {animateItems} from "../mixins/animation/animateItems";

const FavoritesCharactersPage = () => {
    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <FavoritesCharacters />
        </main>
    );
};

export default FavoritesCharactersPage;