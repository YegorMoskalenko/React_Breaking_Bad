import React, {useEffect} from 'react';
import {animateItems} from "../mixins/animation/animateItems";
import {useParams} from "react-router-dom";
import RootStore from '../storeMobx'
import EpisodeTab from "../components/seasonPage/episodes/EpisodeTab";

const EpisodePage = () => {
    const params = useParams()
    const episodeNumParam = +params.episodeId

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <div className="episodes episodes-page">
                <div className="episodes__content episodes-page__content">
                    <EpisodeTab
                        episode={RootStore.breakingBad.breakingBadState.episodes[episodeNumParam - 1]}
                    />
                </div>
            </div>
        </main>
    );
};

export default EpisodePage;