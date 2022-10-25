import React from 'react';
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const Characters = observer(({characterName}) => {
    const router = useHistory()

    const clickOnCharacter = e => {
        e.stopPropagation()
        return router.push(`/character/${characterName.replaceAll(' ', '-')}`)
    }

    return (
        <p className="episode-tab__characters__text episode-tab__child__p" onClick={clickOnCharacter}>{characterName}</p>
    );
});

export default Characters;