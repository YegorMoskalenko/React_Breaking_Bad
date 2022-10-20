import HomePage from "../pages/HomePage";
import SeasonPage from "../pages/SeasonPage";
import EpisodePage from "../pages/EpisodePage";
import ErrorPage from "../pages/ErrorPage";
import CharacterPage from "../pages/CharacterPage";
import FavoritesCharactersPage from "../pages/FavoritesCharactersPage";
import OccupationsPage from "../pages/OccupationsPage";
import SerialInfo from "../pages/SerialInfo";
import TopDeaths from "../pages/TopDeaths";

export const routes = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        path: '/season/:seasonNum',
        component: SeasonPage,
        exact: true
    },
    {
        path: '/episode/:episodeId',
        component: EpisodePage,
        exact: true
    },
    {
        path: '/error',
        component: ErrorPage,
        exact: true
    },
    {
        path: '/character/:characterName',
        component: CharacterPage,
        exact: true
    },
    {
        path: '/favorites-characters',
        component: FavoritesCharactersPage,
        exact: true
    },
    {
        path: '/occupations',
        component: OccupationsPage,
        exact: true
    },
    {
        path: '/serial-info',
        component: SerialInfo,
        exact: true
    },
    {
        path: '/top-deaths',
        component: TopDeaths,
        exact: true
    }
]