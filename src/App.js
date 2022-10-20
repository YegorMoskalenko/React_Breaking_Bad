import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import {useEffect} from "react";
// import {breakingBadForRedux} from './API/breakingBadForRedux'
// import {useDispatch} from "react-redux";
import {observer} from "mobx-react";
import {breakingBadForMobx} from "./API/breakingBadForMobx";
import './App.scss'
import Header from "./components/UI/header/Header";

const App = observer(() => {
    // const dispatch = useDispatch()

    const localStorageBreakingBad = JSON.parse(window.localStorage.getItem('BreakingBadStore'))

    useEffect(() => {
        // if(!window.localStorage.getItem('persist:breakingBad')){
        //     breakingBadForRedux.fetchAllDataBreakingBad(dispatch)
        // }

        if(localStorageBreakingBad.breakingBadState.episodes.length === 0 || !window.localStorage.getItem('BreakingBadStore')){
            breakingBadForMobx.fetchAllDataBreakingBad()
        }
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
