const breakingBadState = {
    episodes: [],
    seasons: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    },
    characters: {},
    deaths: {},
    quotes: {},
    favoritesCharacters: [],
    occupations: {},
    serialInfo: {}
}

const SET_EPISODES = 'SET_EPISODES'
const SET_SEASONS = 'SET_SEASONS'
const SET_CHARACTERS = 'SET_CHARACTERS'
const SET_DEATHS = 'SET_DEATHS'
const SET_QUOTES = 'SET_QUOTES'
const SET_FAVORITES_CHARACTERS = 'SET_FAVORITES_CHARACTERS'
const SET_OCCUPATIONS = 'SET_OCCUPATIONS'
const SET_SERIAL_INFO = 'SET_SERIAL_INFO'

export const breakingBadReducer = (state = breakingBadState, action) => {
    switch (action.type){
        case SET_EPISODES:
            return {...state, episodes: action.payload}
        case SET_SEASONS:
            return {...state, seasons: action.payload}
        case SET_CHARACTERS:
            return {...state, characters: action.payload}
        case SET_DEATHS:
            return {...state, deaths: action.payload}
        case SET_QUOTES:
            return {...state, quotes: action.payload}
        case SET_FAVORITES_CHARACTERS:
            return {...state, favoritesCharacters: action.payload}
        case SET_OCCUPATIONS:
            return {...state, occupations: action.payload}
        case SET_SERIAL_INFO:
            return {...state, serialInfo: action.payload}
        default: return state
    }
}

export const setEpisodes = payload => ({type: SET_EPISODES, payload})
export const setSeasons = payload => ({type: SET_SEASONS, payload})
export const setCharacters = payload => ({type: SET_CHARACTERS, payload})
export const setDeaths = payload => ({type: SET_DEATHS, payload})
export const setQuotes = payload => ({type: SET_QUOTES, payload})
export const setFavoriteCharacters = payload => ({type: SET_FAVORITES_CHARACTERS, payload})
export const setOccupations = payload => ({type: SET_OCCUPATIONS, payload})
export const setSerialInfo = payload => ({type: SET_SERIAL_INFO, payload})