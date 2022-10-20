import React, {useEffect, useRef, useState} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import RootStore from '../../storeMobx'
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const FavoritesCharacters = observer(() => {
    const router = useHistory()
    const isInitialMount = useRef(true)

    const [favoriteCharacters, setFavoriteCharacters] = useState([...RootStore.breakingBad.breakingBadState.favoritesCharacters])

    const removeFromFavoriteCharacters = charIndex => {
        let favCharsNewObj = [...RootStore.breakingBad.breakingBadState.favoritesCharacters]
        favCharsNewObj = favCharsNewObj.filter((favoritesCharacterNew, index) => favCharsNewObj[index] !== favCharsNewObj[charIndex])
        setFavoriteCharacters(() => [...favCharsNewObj])
    }
    const setFavoritesCharactersToStore = () => {
        return RootStore.breakingBad.SET_FAVORITES_CHARACTERS(favoriteCharacters)
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }else {
            setFavoritesCharactersToStore()
        }
    }, [favoriteCharacters])

    return (
        <div className="favorites-characters anim-items">
            {favoriteCharacters.length > 0
                ? <TransitionGroup className="favorites-characters__ul" component="ul">
                    {favoriteCharacters.map((favoriteCharacter, index) =>
                        <CSSTransition
                            key={favoriteCharacter}
                            timeout={500}
                            classNames="favChar"
                        >
                            <li className="favorites-characters__li">
                                <p className="favorites-characters__name" onClick={() => router.push(`/character/${favoriteCharacter.replaceAll(' ', '-')}`)}>{favoriteCharacter}</p>
                                <button className="favorites-characters__btn" onClick={() => removeFromFavoriteCharacters(index)}>Remove from favorites</button>
                            </li>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                : <p className="favorites-characters__none">None favorites !</p>
            }
        </div>
    );
});

export default FavoritesCharacters;