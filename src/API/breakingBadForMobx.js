import RootStore from '../storeMobx'
export const breakingBadForMobx = {
    fetchAllDataBreakingBad: async function () {
        const response = await fetch('https://www.breakingbadapi.com/api/episodes')
        const episodes = await response.json()
        RootStore.breakingBad.SET_EPISODES(episodes)

        return this.setSeasons() + await this.fetchCharacters(episodes) + await this.fetchDeaths() + await this.fetchQuotes() + await this.fetchImdb()
    },

    // seasons
    setSeasons: function () {
        let seasonsNewObj = {...RootStore.breakingBad.breakingBadState.seasons}
        for(let seasonNum in seasonsNewObj){
            RootStore.breakingBad.breakingBadState.episodes.forEach(episode => {
                if(episode.season === seasonNum){
                    seasonsNewObj[seasonNum].push(episode)
                }
            })
        }
        RootStore.breakingBad.SET_SEASONS(seasonsNewObj)

        return true
    },

    // characters && occupations
    fetchCharacters: async function (episodes) {
        let charactersNewObj = {}
        let occupationsNewObj = {}

        const response = await fetch('https://www.breakingbadapi.com/api/characters')
        const characters = await response.json()
        characters.forEach(character => {charactersNewObj[character.name] = {...character}})

        Object.entries(charactersNewObj).forEach(char => {
            char[1].occupation.forEach(occOne => {
                if(occupationsNewObj[occOne]){
                    occupationsNewObj[occOne].push(char[1].name)
                }else {
                    occupationsNewObj[occOne] = []
                    occupationsNewObj[occOne].push(char[1].name)
                }
            })

            let charInEpisodes = []
            episodes.forEach(episode =>
                episode.characters.forEach(character => character === char[1].name ? charInEpisodes.push(episode.title) : false)
            )
            charactersNewObj[char[1].name].episodesWithCharacter = [...charInEpisodes]
        })

        RootStore.breakingBad.SET_OCCUPATIONS(occupationsNewObj)

        return RootStore.breakingBad.SET_CHARACTERS(charactersNewObj)
    },

    // deaths && episodes
    fetchDeaths: async function () {
        let deathsNewObj = {}
        let charactersNewObj = {...RootStore.breakingBad.breakingBadState.characters}
        const response = await fetch('https://www.breakingbadapi.com/api/deaths')
        const deaths = await response.json()
        deaths.forEach(death => {
            deathsNewObj[death.death] = {...death}
        })

        // set number of deaths and deaths to characters
        Object.entries(charactersNewObj).forEach(char => {
            charactersNewObj[char[0]].numOfDeaths = 0
            charactersNewObj[char[0]].deaths = []
            deaths.forEach(death => {
                if(death.responsible.includes(char[0])){
                    charactersNewObj[char[0]].numOfDeaths = charactersNewObj[char[0]].numOfDeaths + 1
                    charactersNewObj[char[0]].deaths.push(death.death)
                }
            })
        })

        //set deaths to episodes
        let episodesNewArray = [...RootStore.breakingBad.breakingBadState.episodes]
        episodesNewArray.forEach((episode, index) => {
            episode.deaths = []
            episode.responsibles = []
            deaths.forEach(death => +episode.episode === death.episode ? episode.deaths.push(death.death) && episode.responsibles.push(death.responsible) : false)
        })

        RootStore.breakingBad.SET_EPISODES(episodesNewArray)
        RootStore.breakingBad.SET_CHARACTERS(charactersNewObj)

        return RootStore.breakingBad.SET_DEATHS(deathsNewObj)
    },

    //quotes
    fetchQuotes: async function () {
        let charactersNewObj = {...RootStore.breakingBad.breakingBadState.characters}
        const response = await fetch('https://www.breakingbadapi.com/api/quotes')
        const quotes = await response.json()
        Object.entries(charactersNewObj).forEach(character => {
            let arrOfQuotes = []
            quotes.forEach(quote => {
                if(character[0] === quote.author){
                    arrOfQuotes.push(quote)
                }
            })

            return arrOfQuotes.length > 0 ? charactersNewObj[character[0]].quotes = arrOfQuotes : false
        })

        return RootStore.breakingBad.SET_CHARACTERS(charactersNewObj)
    },

    //serial info
    fetchImdb: async function () {
        let apikey = '88e836ce'
        const response = await fetch(`http://www.omdbapi.com/?t=Breaking+Bad&plot=full&apikey=${apikey}`)
        const result = await response.json()
        console.log('Success fetch!')

        return RootStore.breakingBad.SET_SERIAL_INFO(result)
    }
}