import React from 'react';
import SeasonTab from './SeasonsTab'
import RootStore from '../../../storeMobx'

const SeasonsTabs = () => {
    return (
        <div className="seasons anim-items">
            {Object.entries(RootStore.breakingBad.breakingBadState.seasons).map(([seasonNum, seasonContent]) =>
                <SeasonTab
                    seasonNum={seasonNum}
                    key={seasonNum}
                />
            )}
        </div>
    );
};

export default SeasonsTabs;