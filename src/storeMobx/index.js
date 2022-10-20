import {BreakingBadStore} from './breakingBadStore'

class RootStore {
    breakingBad: BreakingBadStore;

    constructor() {
        this.breakingBad = new BreakingBadStore();
    }
}

export const rootStore = new RootStore();
export default new RootStore()