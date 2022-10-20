import React from 'react';
import RootStore from '../../../storeMobx'
import EpisodeTab from "./EpisodeTab";
import {observer} from "mobx-react";

const EpisodesTabs = observer(({seasonNumUrlParam}) => {
    return (
        <div className="episodes">
            <div className="episodes__content">
                {RootStore.breakingBad.breakingBadState.seasons[seasonNumUrlParam].map(episode =>
                    <EpisodeTab
                        episode={episode}
                        seasonNumUrlParam={seasonNumUrlParam}
                        key={episode.episode_id}
                    />
                )}
            </div>
        </div>
    );
});

export default EpisodesTabs;