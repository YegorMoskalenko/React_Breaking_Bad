import {setEpisodes, setSeasons, setCharacters, setDeaths, setOccupations, setSerialInfo} from '../storeRedux/reducers/breakingBadReducer'
import store from '../storeRedux'

export const breakingBadForRedux = {
    fetchAllDataBreakingBad: async function (dispatch) {
        const state = store.getState().breakingBadReducer
        const response = await fetch('https://www.breakingbadapi.com/api/episodes')
        const episodes = await response.json()

        return await this.setSeasons(dispatch, episodes, state)
    },

    //seasons
    setSeasons: async function (dispatch, episodes, state) {
        let seasonsNewObj = {...state.seasons}
        for(let seasonNum in seasonsNewObj){
            episodes.forEach(episode => {
                if(episode.season === seasonNum){
                    seasonsNewObj[seasonNum].push(episode)
                }
            })
        }

        dispatch(setSeasons(seasonsNewObj))

        return await this.fetchCharacters(dispatch, episodes)
    },

    // characters && occupations
    fetchCharacters: async function (dispatch, episodes) {
        let charactersNewObj = {}
        let occupationsNewObj = {}

        const response = await fetch('https://www.breakingbadapi.com/api/characters')
        const characters = await response.json()
        characters.forEach(character => charactersNewObj[character.name] = {...character})

        Object.entries(charactersNewObj).forEach(char => {
            char[1].occupation.forEach(occOne => {
                if(occupationsNewObj[occOne]){
                    occupationsNewObj[occOne].push(char[1].name)
                }else {
                    occupationsNewObj[occOne] = []
                    occupationsNewObj[occOne].push(char[1].name)
                }
            })
        })

        dispatch(setOccupations(occupationsNewObj))
        // dispatch(setCharacters(charactersNewObj))

        return await this.fetchDeaths(dispatch, charactersNewObj, episodes)
    },

    // deaths && episodes
    fetchDeaths: async function (dispatch, charactersNewObjPrev, episodes) {
        let deathsNewObj = {}
        let charactersNewObj = {...charactersNewObjPrev}
        const response = await fetch('https://www.breakingbadapi.com/api/deaths')
        const deaths = await response.json()
        deaths.forEach(death => {
            deathsNewObj[death.death] = {...death}
        })

        // set number of deaths and deaths to characters
        Object.entries(charactersNewObj).forEach(char => {
            charactersNewObj[char[0]] = {...charactersNewObj[char[0]], numOfDeaths: 0}
            charactersNewObj[char[0]].deaths = []
            deaths.forEach(death => {
                if(death.responsible.includes(char[0])){
                    charactersNewObj[char[0]].numOfDeaths = charactersNewObj[char[0]].numOfDeaths + 1
                    charactersNewObj[char[0]].deaths.push(death.death)
                }
            })
        })

        //set deaths to episodes
        let episodesNewArray = [...episodes]
        episodesNewArray.forEach(episode => {
            episode = {...episode, deaths: []}
            episode.responsibles = []
            deaths.forEach(death => +episode.episode === death.episode ? episode.deaths.push(death.death) && episode.responsibles.push(death.responsible) : false)
        })

        dispatch(setEpisodes(episodesNewArray))
        // dispatch(setCharacters(charactersNewObj))
        dispatch(setDeaths(deathsNewObj))

        return await this.fetchQuotes(dispatch, charactersNewObj)
    },

    //quotes
    fetchQuotes: async function (dispatch, charactersNewObjPrev) {
        let charactersNewObj = {...charactersNewObjPrev}
        const response = await fetch('https://www.breakingbadapi.com/api/quotes')
        const quotes = await response.json()
        Object.entries(charactersNewObj).forEach(character => {
            let arrOfQuotes = []
            quotes.forEach(quote => {
                if(character[0] === quote.author){
                    arrOfQuotes.push(quote)
                }
            })

            // console.log(arrOfQuotes)
            return arrOfQuotes.length > 0 ? charactersNewObj[character[0]] = {...charactersNewObj[character[0]], quotes: arrOfQuotes} : false
        })

        dispatch(setCharacters(charactersNewObj))

        return await this.fetchImdb(dispatch)
    },

    //serial info
    fetchImdb: async function (dispatch) {
        let apikey = '88e836ce'
        const response = await fetch(`http://www.omdbapi.com/?t=Breaking+Bad&plot=full&apikey=${apikey}`)
        const result = await response.json()

        dispatch(setSerialInfo(result))
    }
}