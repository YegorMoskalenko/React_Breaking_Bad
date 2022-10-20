import React, {useEffect} from 'react';
import {animateItems} from "../mixins/animation/animateItems";
import {useParams} from "react-router-dom";
import Character from "../components/characterPage/Character";
import '../components/characterPage/styles/character.scss'

const CharacterPage = () => {
    const params = useParams()

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <Character
                characterStrName={params.characterName.replaceAll('-', ' ')}
            />
        </main>
    );
};

export default CharacterPage;