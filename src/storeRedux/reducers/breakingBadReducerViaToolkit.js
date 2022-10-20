import {createSlice} from '@reduxjs/toolkit';

const breakingBadStore = createSlice({
    name: 'breakingBad',
    initialState: {
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
        serialInfo: {},

        // index for seasons Array
        seasonNum: null
    },
    reducers: {
        SET_EPISODES(state, action){
            state.episodes = action.payload
        },
        SET_SEASON(state, action){
            if(state.seasonNum !== null){
                state.seasons[state.seasonNum].push(action.payload)
            }
        },
        SET_SEASON_NUM(state, action){
            state.seasonNum = action.payload
        },
        SET_CHARACTERS(state, action){
            state.characters = action.payload
        },
        SET_DEATHS(state, action){
            state.deaths = action.payload
        },
        SET_QUOTES(state, action){
            state.quotes = action.payload
        },
        SET_FAVORITES_CHARACTERS(state, action){
            state.favoritesCharacters = action.payload
        },
        SET_OCCUPATIONS(state, action){
            state.occupations = action.payload
        },
        SET_SERIAL_INFO(state, action){
            state.serialInfo = action.payload
        }
    }
})

const { actions, reducer } = breakingBadStore
export const { SET_EPISODES, SET_SEASON, SET_SEASON_NUM, SET_CHARACTERS, SET_DEATHS, SET_QUOTES, SET_FAVORITES_CHARACTERS, SET_OCCUPATIONS, SET_SERIAL_INFO } = actions
export default reducer