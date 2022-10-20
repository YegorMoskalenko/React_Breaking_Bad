import React, {useEffect, useMemo} from 'react';
import {animateItems} from "../mixins/animation/animateItems";
import './styles/topDeaths.scss'
import RootStore from '../storeMobx'

const TopDeaths = () => {
    const getTopDeaths = useMemo(() => {
        return Object.entries(RootStore.breakingBad.breakingBadState.characters).sort((a,b) => b[1].numOfDeaths - a[1].numOfDeaths)
    }, [])

    const nums = [1, 2, 3, 4, 5]

    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <div className="top-deaths">
                <ul className="top-deaths__ul">
                    {nums.map(index =>
                        <li className="top-deaths__li anim-items" key={getTopDeaths[index - 1][0]}>
                            <div className="top-deaths__characters">
                                <img src={getTopDeaths[index - 1][1].img} alt="" className="char-img"/>
                                <div className="top-deaths__characters__info">
                                    <p className="top-deaths__characters__name">{getTopDeaths[index - 1][0]}</p>
                                    {getTopDeaths[index - 1][1].numOfDeaths > 1
                                        ?   <p className="top-deaths__characters__info__num-of-deaths">Num of Deaths - {getTopDeaths[index - 1][1].numOfDeaths}</p>
                                        : false
                                    }
                                    <p className="who-died">Who died:</p>
                                    <ul className="top-deaths__characters__info__ul">
                                        {getTopDeaths[index - 1][1].deaths.map((death, i) =>
                                            <li className="top-deaths__characters__info__li" key={i}>{death};</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </main>
    );
};

export default TopDeaths;