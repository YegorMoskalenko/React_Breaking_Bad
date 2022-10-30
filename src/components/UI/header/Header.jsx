import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
// import RootStore from '../../../storeMobx'
import './styles/header.scss'
import {animateItems} from "../../../mixins/animation/animateItems";

const Header = () => {
    const router = useHistory()
    // const isInitialMount = useRef(true);

    // const [episodeOfSeason, setEpisodeOfSeason] = useState(null)
    const [startMount, setStartMount] = useState(null)
    // const [routeParamsEpisodeId, setRouteParamsEpisodeId] = useState([])

    // const setParams = () => {
    //     const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    //     const numArrNew = []
    //     router.location.pathname.split('').forEach(path => nums.filter(num => num === path ? numArrNew.push(path) : false))
    //     setRouteParamsEpisodeId(() => +numArrNew.join(''))
    // }
    //
    // const pushingToPreviousPage = () => {
    //     console.log(routeParamsEpisodeId)
    //     return router.push(`/season/${episodeOfSeason}`)
    // }
    //
    // const routerToPrevEpisode = () => {
    //     // setRouteParamsEpisodeId(() => episodeId)
    //     Object.entries(RootStore.breakingBad.breakingBadState.seasons).forEach((season, index) => {
    //         let newIndex = index + 1
    //         season[1].filter(episode => episode.episode_id === routeParamsEpisodeId ? setEpisodeOfSeason(() => newIndex) : false)
    //     })
    // }

    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false;
    //     }else {
    //         pushingToPreviousPage()
    //     }
    // }, [episodeOfSeason])
    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false;
    //     }else {
    //         routerToPrevEpisode()
    //     }
    // }, [routeParamsEpisodeId])

    useEffect(() => {
        setStartMount(() => true)

        // setParams()
        animateItems()

        setTimeout(() => {
            setStartMount(() => false)
        }, 300)
    }, [])

    return (
        <header className={`header anim-items ${startMount === false ? 'anim-active' : ''}`}>
            <div className="header__left-side">
                {!router.location.pathname !== '/' ? <button onClick={() => router.push('/')} className="header__content__links">Go home</button> : false}
                <button onClick={() => router.push('/top-deaths')} className="header__content__links">Top 5 Deaths</button>
                {/*{router.location.pathname === `/episode/${routeParamsEpisodeId}` ? <button onClick={() => {setParams()}} className="header__content__links">Back to episodes</button> : false}*/}
            </div>
            <div className="header__right-side">
                <button onClick={() => router.push('/serial-info')} className="header__content__links">Serial info</button>
                <button onClick={() => router.push('/occupations')} className="header__content__links">Occupations</button>
                <button onClick={() => router.push('/favorites-characters')} className="header__content__links">Favorites</button>
            </div>
        </header>
    );
};

export default Header;