import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import RootStore from '../../storeMobx'
import {observer} from "mobx-react";
import {setFavoriteCharacters} from '../../storeRedux/reducers/breakingBadReducer'

// MOBX

const Character = observer(({characterStrName}) => {
    const breakingBadState = RootStore.breakingBad.breakingBadState

    const [responsibleNew, setResponsibleNew] = useState([])

    const setResponsibleNewModel = () => {
        Object.entries(breakingBadState.deaths).filter(death =>
            death[1].responsible.includes(characterStrName) ? setResponsibleNew(() => responsibleNew.push(death[1].responsible)) : false
        )

        return setResponsibleNew(() => [...new Set(responsibleNew)])
    }
    const addCharacterToFavorites = () => {
        const favoritesCharactersNew = [...breakingBadState.favoritesCharacters]
        favoritesCharactersNew.push(characterStrName)


        return RootStore.breakingBad.SET_FAVORITES_CHARACTERS(favoritesCharactersNew)
    }
    const removeCharacterFromFavorites = charIndex => {
        let favCharsNewObj = [...breakingBadState.favoritesCharacters]
        favCharsNewObj = favCharsNewObj.filter((favoritesCharacterNew, index) => favCharsNewObj[index] !== favCharsNewObj[charIndex])

        return RootStore.breakingBad.SET_FAVORITES_CHARACTERS(favCharsNewObj)
    }

    useEffect(() => {
        setResponsibleNewModel()
    }, [])

    if(breakingBadState.characters[characterStrName]){
        return (
            <div className="character">
                <div className="character__title anim-items">
                    <p>{characterStrName}</p>
                </div>
                <div className="character__info anim-items">
                    <div className="add-to-favor">
                        {!breakingBadState.favoritesCharacters.includes(characterStrName)
                            ?   <button className="add-to-favor__btn" onClick={() => addCharacterToFavorites()}>Add to favorites</button>
                            :   <div className="remove-from-favor__div">
                                <p className="remove-from-favor__text">Already in favorites</p>
                                <button className="remove-from-favor__btn" onClick={() => removeCharacterFromFavorites(breakingBadState.favoritesCharacters.indexOf(characterStrName))}>Remove from favorites</button>
                            </div>
                        }
                    </div>
                    <p className="character__info__status">
                        Status: {breakingBadState.characters[characterStrName].status}
                    </p>
                    <p className="character__info__birthday">
                        Birthday: {breakingBadState.characters[characterStrName].birthday}
                    </p>
                    <div className="character__info__content character__info__quotes">
                        <p className="character__info__content__title">Quotes:</p>
                        {breakingBadState.characters[characterStrName].quotes
                            ?   <ul className="quotes">
                                {Object.entries(breakingBadState.characters[characterStrName].quotes).map(([index, quote]) =>
                                    <li className="quote" key={index}>{index + 1}. {quote.quote}</li>
                                )}
                            </ul>
                            :   <p className="quotes">None quotes</p>
                        }
                    </div>
                    <div className="character__info__content character__info__deaths">
                        <div className="season-number">
                            <p className="season-number__title character__info__content__title">Season:</p>
                            {breakingBadState.deaths[characterStrName]
                                ? <p className="season-number__num">{breakingBadState.deaths[characterStrName].season}</p>
                                : <p className="season-number__num">None info</p>
                            }
                        </div>
                        <div className="responsible">
                            <p className="responsible__title character__info__content__title">Responsible in his/her death:</p>
                            {breakingBadState.deaths[characterStrName]
                                ? <p className="responsible__info">{breakingBadState.deaths[characterStrName].responsible}</p>
                                : <p className="responsible__info">None</p>
                            }
                        </div>
                        <div className="character-is-responsible">
                            <p className="character-is-responsible__title character__info__content__title">The character is responsible in deaths:</p>
                            {responsibleNew.length > 0
                                ?   <ul className="character-is-responsible__info">
                                    {responsibleNew.map(responsibleStr =>
                                        <li className="character-is-responsible__info__li" key={responsibleStr}>{responsibleStr}</li>
                                    )}
                                </ul>
                                :   <p className="character-is-responsible__info">None</p>
                            }
                        </div>
                        <div className="character-in-episodes">
                            <p className="character-in-episodes__title character__info__content__title">Episodes with {characterStrName}:</p>
                            <ul className="episodes__titles">
                                {breakingBadState.characters[characterStrName].episodesWithCharacter.map(episodeTitle =>
                                    <li className="episodes__title" key={episodeTitle}>"{episodeTitle}"</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="not-info-about-character">None info about character</div>
        )
    }
})

// REDUX EXAMPLE

// const Character = ({characterStrName}) => {
//     const dispatch = useDispatch()
//     const breakingBadState = useSelector(state => state.breakingBadReducer.breakingBadData)
//     console.log(breakingBadState)
//
//     const [responsibleNew, setResponsibleNew] = useState([])
//
//     const setResponsibleNewModel = () => {
//         Object.entries(breakingBadState.deaths).filter(death =>
//             death[1].responsible.includes(characterStrName) ? setResponsibleNew(() => responsibleNew.push(death[1].responsible)) : false
//         )
//
//         return setResponsibleNew(() => [...new Set(responsibleNew)])
//     }
//     const addCharacterToFavorites = () => {
//         const favoritesCharactersNew = [...breakingBadState.favoritesCharacters]
//         favoritesCharactersNew.push(characterStrName)
//
//
//         return dispatch(setFavoriteCharacters(favoritesCharactersNew))
//     }
//     const removeCharacterFromFavorites = charIndex => {
//         let favCharsNewObj = [...breakingBadState.favoritesCharacters]
//         favCharsNewObj = favCharsNewObj.filter((favoritesCharacterNew, index) => favCharsNewObj[index] !== favCharsNewObj[charIndex])
//
//         return dispatch(setFavoriteCharacters(favCharsNewObj))
//     }
//
//     useEffect(() => {
//         setResponsibleNewModel()
//     }, [])
//
//     if(breakingBadState.characters[characterStrName]){
//         return (
//             <div className="character">
//                 <div className="character__title anim-items">
//                     <p>{characterStrName}</p>
//                 </div>
//                 <div className="character__info anim-items">
//                     <div className="add-to-favor">
//                         {!breakingBadState.favoritesCharacters.includes(characterStrName)
//                             ?   <button className="add-to-favor__btn" onClick={() => addCharacterToFavorites()}>Add to favorites</button>
//                             :   <div className="remove-from-favor__div">
//                                 <p className="remove-from-favor__text">Already in favorites</p>
//                                 <button className="remove-from-favor__btn" onClick={() => removeCharacterFromFavorites(breakingBadState.favoritesCharacters.indexOf(characterStrName))}>Remove from favorites</button>
//                             </div>
//                         }
//                     </div>
//                     <p className="character__info__status">
//                         Status: {breakingBadState.characters[characterStrName].status}
//                     </p>
//                     <p className="character__info__birthday">
//                         Birthday: {breakingBadState.characters[characterStrName].birthday}
//                     </p>
//                     <div className="character__info__content character__info__quotes">
//                         <p className="character__info__content__title">Quotes:</p>
//                         {breakingBadState.characters[characterStrName].quotes
//                             ?   <ul className="quotes">
//                                 {Object.entries(breakingBadState.characters[characterStrName].quotes).map(([index, quote]) =>
//                                     <li className="quote" key={index}>{index + 1}. {quote.quote}</li>
//                                 )}
//                             </ul>
//                             :   <p className="quotes">None quotes</p>
//                         }
//                     </div>
//                     <div className="character__info__content character__info__deaths">
//                         <div className="season-number">
//                             <p className="season-number__title character__info__content__title">Season:</p>
//                             {breakingBadState.deaths[characterStrName]
//                                 ? <p className="season-number__num">{breakingBadState.deaths[characterStrName].season}</p>
//                                 : <p className="season-number__num">None info</p>
//                             }
//                         </div>
//                         <div className="responsible">
//                             <p className="responsible__title character__info__content__title">Responsible in his/her death:</p>
//                             {breakingBadState.deaths[characterStrName]
//                                 ? <p className="responsible__info">{breakingBadState.deaths[characterStrName].responsible}</p>
//                                 : <p className="responsible__info">None</p>
//                             }
//                         </div>
//                         <div className="character-is-responsible">
//                             <p className="character-is-responsible__title character__info__content__title">The character is responsible in deaths:</p>
//                             {responsibleNew.length > 0
//                                 ?   <ul className="character-is-responsible__info">
//                                     {responsibleNew.map(responsibleStr =>
//                                         <li className="character-is-responsible__info__li" key={responsibleStr}>{responsibleStr}</li>
//                                     )}
//                                 </ul>
//                                 :   <p className="character-is-responsible__info">None</p>
//                             }
//                         </div>
//                         <div className="character-in-episodes">
//                             <p className="character-in-episodes__title character__info__content__title">Episodes with {characterStrName}:</p>
//                             <ul className="episodes__titles">
//                                 {breakingBadState.characters[characterStrName].episodesWithCharacter.map(episodeTitle =>
//                                     <li className="episodes__title" key={episodeTitle}>"{episodeTitle}"</li>
//                                 )}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     } else {
//         return (
//             <div className="not-info-about-character">None info about character</div>
//         )
//     }
// }

export default Character;