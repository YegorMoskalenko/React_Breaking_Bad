import React, {useEffect} from 'react';
import Occupations from "../components/occupationsPage/Occupations";
import {animateItems} from "../mixins/animation/animateItems";
import '../components/occupationsPage/styles/occupations.scss'

const OccupationsPage = () => {
    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <Occupations />
        </main>
    );
};

export default OccupationsPage;