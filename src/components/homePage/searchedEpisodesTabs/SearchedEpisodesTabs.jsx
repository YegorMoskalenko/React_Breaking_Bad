import React, {useMemo} from 'react';
import {observer} from "mobx-react";
import RootStore from '../../../storeMobx'
import SearchedEpisodeTab from "./SearchedEpisodeTab";
import './styles/searchedEpisodes.scss'

const SearchedEpisodesTabs = observer(({searchEpisodeValue}) => {
    const getSearchedEpisodes = useMemo(() => {
        return Object.entries(RootStore.breakingBad.breakingBadState.episodes).filter(episode =>
            episode[1].title.toLowerCase().includes(searchEpisodeValue.toLowerCase()) ||
            episode[1].deaths.join(' ').toLowerCase().includes(searchEpisodeValue.toLowerCase()) ||
            episode[1].responsibles.join(' ').toLowerCase().includes(searchEpisodeValue.toLowerCase())
        )
    }, [searchEpisodeValue])

    return (
        <div className="episodes">
            <div className="episodes__content">
                {getSearchedEpisodes.map((episode, index) =>
                    <SearchedEpisodeTab
                        episode={episode}
                        index={index}
                        key={+index}
                    />
                )}
            </div>
        </div>
    );
});

export default SearchedEpisodesTabs;