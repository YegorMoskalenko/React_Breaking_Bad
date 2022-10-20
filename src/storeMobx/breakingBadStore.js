import {getPersistedStore, hydrateStore, makePersistable, stopPersisting} from 'mobx-persist-store';

import {configure, makeObservable, observable, action} from "mobx"

configure({
    enforceActions: "never"
})

export class BreakingBadStore {
    breakingBadState = {
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

    constructor() {
        makeObservable(this, {
            breakingBadState: observable,
            hydrateStore: action,
            SET_EPISODES: action,
            SET_SEASONS: action,
            SET_CHARACTERS: action,
            SET_DEATHS: action,
            SET_OCCUPATIONS: action,
            SET_FAVORITES_CHARACTERS: action,
            SET_QUOTES: action,
            SET_SERIAL_INFO: action

        }, {deep: true})
        makePersistable(this, { name: 'BreakingBadStore', properties: ['breakingBadState'], storage: window.localStorage });
    }

    // Computed

    // get funcName(){
    //     return // something
    // }

    get getBreakingBadState(){
        return this.breakingBadState
    }

    // Actions

    stopStore() {
        stopPersisting(this);
    }

    async hydrateStore() {
        await hydrateStore(this);
    }

    async getStoredData() {
        return getPersistedStore(this);
    }

    SET_EPISODES(episodes) {
        this.breakingBadState.episodes = episodes
    }
    SET_SEASONS(seasons) {
        this.breakingBadState.seasons = seasons
    }
    SET_CHARACTERS(characters) {
        this.breakingBadState.characters = characters
    }
    SET_DEATHS(deaths) {
        this.breakingBadState.deaths = deaths
    }
    SET_QUOTES(quotes) {
        this.breakingBadState.quotes = quotes
    }
    SET_FAVORITES_CHARACTERS(favoritesCharacters) {
        this.breakingBadState.favoritesCharacters = favoritesCharacters
    }
    SET_OCCUPATIONS(occupations) {
        this.breakingBadState.occupations = occupations
    }
    SET_SERIAL_INFO(serialInfo) {
        this.breakingBadState.serialInfo = serialInfo
    }
}