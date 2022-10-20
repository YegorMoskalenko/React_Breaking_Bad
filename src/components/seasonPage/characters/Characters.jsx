import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";

const Characters = ({characterName}) => {
    const router = useHistory()

    const [characterNameInUrl, setCharacterNameInUrl] = useState(0)

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }else {
            pushingToCharacterPage()
        }
    }, [characterNameInUrl])

    const pushingToCharacterPage = () => {
        return router.push(`/character/${characterNameInUrl}`)
    }

    return (
        <p className="episode-tab__characters__text episode-tab__child__p" onClick={() => setCharacterNameInUrl(() => characterName.replaceAll(' ', '-'))}>{characterName}</p>
    );
};

export default Characters;