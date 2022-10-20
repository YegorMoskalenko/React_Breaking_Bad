import React from 'react';

const DeathInfo = ({number, death}) => {
    return (
        <div className="episode-tab__deaths episode-tab__child">
            <p className="numerable">{number}.</p>
            <div className="episode-tab__child__texts">
                <p className="episode-tab__child__texts__title">Death:</p>
                <p className="episode-tab__child__texts__text">{death.death}</p>
            </div>
            <div className="episode-tab__child__texts">
                <p className="episode-tab__child__texts__title">Cause:</p>
                <p className="episode-tab__child__texts__text">{death.cause}</p>
            </div>
            <div className="episode-tab__child__texts">
                <p className="episode-tab__child__texts__title">Responsible:</p>
                <p className="episode-tab__child__texts__text">{death.responsible}</p>
            </div>
            <div className="episode-tab__child__texts">
                <p className="episode-tab__child__texts__title">Last words:</p>
                <p className="episode-tab__child__texts__text">{death.last_words}</p>
            </div>
        </div>
    );
};

export default DeathInfo;