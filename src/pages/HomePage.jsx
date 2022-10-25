import React, {useEffect, useState} from 'react';
import SeasonsTabs from '../components/homePage/seasons/SeasonsTabs'
import {animateItems} from "../mixins/animation/animateItems";
import '../components/homePage/seasons/styles/seasons.scss'
import './styles/homePage.scss'
// import {observer} from "mobx-react";
import SearchedEpisodesTabs from "../components/homePage/searchedEpisodesTabs/SearchedEpisodesTabs";

const HomePage = () => {
    const [searchEpisodeValue, setSearchEpisodeValue] = useState('')

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <div className="search-episodes anim-items">
                <input
                    value={searchEpisodeValue}
                    onChange={e => setSearchEpisodeValue(e.target.value)}
                    className="search-episodes__input"
                    type="text"
                    placeholder="Search episode..."
                />
            </div>
            {!!searchEpisodeValue.length &&
                   <SearchedEpisodesTabs
                        searchEpisodeValue={searchEpisodeValue}
                    />
            }
            <SeasonsTabs />
        </main>
    );
};

export default HomePage;

