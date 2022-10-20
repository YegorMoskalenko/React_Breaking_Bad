import React, {useEffect, useMemo, useState} from 'react';
import RootStore from "../../../storeMobx";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom";
import Characters from "../../seasonPage/characters/Characters";
import DeathInfo from "../../seasonPage/episodes/DeathInfo";
import {animateItems} from "../../../mixins/animation/animateItems";

const SearchedEpisodeTab = observer(({episode}) => {
    const router = useHistory()

    const [deaths, setDeaths] = useState({})
    const [city, setCity] = useState('') // Albuquerque or London ...
    const [weatherModel, setWeatherModel] = useState(null)
    const [errorFromFetch, setErrorFromFetch] = useState(false)
    const [errorFromCondition, setErrorFromCondition] = useState(false)

    const reverseAirDate = useMemo(() => {
        return [episode[1].air_date.split('-')[2], episode[1].air_date.split('-')[0], episode[1].air_date.split('-')[1]].join('-')
    }, [])


    const setDeathsModel = () => {
        setDeaths(() => Object.entries(RootStore.breakingBad.breakingBadState.deaths).filter(deathFromArr => +deathFromArr[1].episode === +episode[1].episode))
    }

    const fetchWeather = async () => {
        let numsStr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let strHasNum = true
        await numsStr.forEach(num => city.split('').includes(num) ? strHasNum = false : false)
        if(city.length > 0 && strHasNum === true){
            try {
                const apiKey = '3ed4de1e2c375d462d81f6766d97f259'

                // convert to unix

                const dateStr = reverseAirDate;
                const date = new Date(dateStr);
                const timestampInMs = date.getTime();
                const unixTimestamp = Math.floor(timestampInMs / 1000);

                const coord = {}

                const responseGetCoord = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&dt=${unixTimestamp}&appid=${apiKey}`)
                const weatherForCoord = await responseGetCoord.json()
                coord.lat = weatherForCoord.coord.lat
                coord.lon = weatherForCoord.coord.lon

                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${coord.lat}&lon=${coord.lon}&dt=${unixTimestamp}&appid=${apiKey}`)
                const weather = await response.json()
                setWeatherModel(weatherModel => weatherModel = {...weather.data[0].weather[0]})
            } catch (e) {
                setErrorFromFetch(() => true)
                console.error(`Error fetching: ${e}`)
            }
        } else {
            setErrorFromCondition(() => true)
        }
    }

    useEffect(() => {
        animateItems()
        setDeathsModel()
    }, [])

    return (
        <div className="episode-tab anim-items" onClick={() => router.push(`/episode/${episode[1].episode_id}`)}>
            <div className="episodes-tab__title episode-tab__child">
                <p className="episodes-tab__title__text episode-tab__child__p">{episode[1].title}</p>
            </div>
            <div className="episode-tab__date episode-tab__child">
                <div className="episode-tab__date__text episode-tab__child__p">
                    <p>Release date:</p>
                    <p>{reverseAirDate}</p>
                </div>
            </div>
            {weatherModel !== null
                ?    <div className="weather-info episode-tab__child">
                        <p className="weather-info__title">Description for {reverseAirDate}:</p>
                        <p className="weather-info__description">{weatherModel.description}</p>
                    </div>
                : false
            }
            <div className="search-weather episode-tab__child" onClick={e => e.stopPropagation()}>
                <input
                    value={city}
                    onChange={e => setCity(() => e.target.value)}
                    type="text"
                    className="search-weather__input"
                    placeholder="Write a city"
                    onFocus={() => {setErrorFromFetch(() => false); setErrorFromCondition(() => false)}}
                />
                <button className="search-weather__btn" onClick={() => fetchWeather()}>Get weather info</button>
                {errorFromCondition === true ? <p className="error-from-condition">Write name of the city!</p> : false}
                {errorFromFetch === true ? <p className="error-from-fetch">Write correct name of the city or the city not found!</p> : false}
            </div>
            <div className="episode-tab__characters episode-tab__child">
                <p className="episode-tab__characters__title">Characters:</p>
                {Object.entries(episode[1].characters).map(([index, characterName]) =>
                    <Characters
                        characterName={characterName}
                        key={+index}
                    />
                )}
            </div>
            {router.location.pathname === `/episode/${episode[1].episode_id}`
                ? Object.entries(deaths).map(([index, death]) =>
                    <DeathInfo key={+index} number={+index + 1} death={death[1]} />
                )
                : false
            }
        </div>
    );
});

export default SearchedEpisodeTab;