import React from 'react';
import {useHistory} from "react-router-dom";

const SeasonsTab = ({seasonNum}) => {
    const router = useHistory()

    return (
        <div className="seasons__season" onClick={() => router.push(`/season/${seasonNum}`)}>
            <div className="seasons__season__content">
                <p className="seasons__season__content__title">Season {seasonNum}</p>
                <p className="seasons__season__content__text">Go to info</p>
            </div>
        </div>
    );
};

export default SeasonsTab;