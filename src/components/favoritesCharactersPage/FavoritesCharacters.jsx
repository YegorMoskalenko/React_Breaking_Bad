import React, {useEffect, useRef, useState} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import RootStore from '../../storeMobx'
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const FavoritesCharacters = observer(() => {
    const router = useHistory()

    const favoriteCharacters = RootStore.breakingBad.breakingBadState.favoritesCharacters

    const removeFromFavoriteCharacters = charIndex => {
        let favCharsNewObj = [...favoriteCharacters]
        favCharsNewObj = favCharsNewObj.filter((favoritesCharacterNew, index) => favCharsNewObj[index] !== favCharsNewObj[charIndex])

        return RootStore.breakingBad.SET_FAVORITES_CHARACTERS(favCharsNewObj)
    }

    const pushToCharacterPage = favoriteCharacter => {
        router.push(`/character/${favoriteCharacter.replaceAll(' ', '-')}`)
    }

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
                                <p className="favorites-characters__name" onClick={() => pushToCharacterPage(favoriteCharacter)}>{favoriteCharacter}</p>
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