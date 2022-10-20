import React, {useEffect, useState} from 'react';
import SeasonsTabs from '../components/homePage/seasons/SeasonsTabs'
import {animateItems} from "../mixins/animation/animateItems";
import '../components/homePage/seasons/styles/seasons.scss'

const HomePage = () => {
    const [searchEpisodeValue, setSearchEpisodeValue] = useState('')

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            {/*<div className="search-episodes anim-items">*/}
            {/*    <input v-model="searchEpisodeValue" className="search-episodes__input" type="text"*/}
            {/*           placeholder="Search episode..."/>*/}
            {/*</div>*/}
            {/*<SearchedEpisodesTabs*/}
            {/*    v-if="searchEpisodeValue.length > 0"*/}
            {/*    :searchEpisodeValue="searchEpisodeValue"*/}
            {/*/>*/}
            <SeasonsTabs />
        </main>
    );
};

export default HomePage;

