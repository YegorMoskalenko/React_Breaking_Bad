import React, {useEffect, useState} from 'react';
import EpisodesTabs from '../components/seasonPage/episodes/EpisodesTabs'
import {useHistory, useParams} from "react-router-dom";
import RootStore from '../storeMobx'
import '../components/seasonPage/episodes/styles/episodes.scss'
import {animateItems} from "../mixins/animation/animateItems";
import {observer} from "mobx-react";

const SeasonPage = observer(() => {
    const params = useParams()
    const router = useHistory()

    const [seasonNumUrlParam, setSeasonNumUrlParam] = useState(+params.seasonNum)

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            {seasonNumUrlParam < 1 || seasonNumUrlParam > Object.entries(RootStore.breakingBad.breakingBadState.seasons).length
                ? router.push('/error')
                : <EpisodesTabs
                    seasonNumUrlParam={seasonNumUrlParam}
                />
            }
        </main>
    );
});

export default SeasonPage;