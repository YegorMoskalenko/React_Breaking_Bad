import React, {useEffect} from 'react';
import './styles/serialinfo.scss'
import RootStore from '../storeMobx'
import {animateItems} from "../mixins/animation/animateItems";
import {observer} from "mobx-react";

const SerialInfo = observer(() => {
    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <div className="serial-info">
                <div className="serial-info__left-side anim-items">
                    <img src={RootStore.breakingBad.breakingBadState.serialInfo.Poster} alt=""/>
                </div>
                <div className="serial-info__right-side anim-items">
                    <ul className="serial-info__right-side__ul">
                        {Object.entries(RootStore.breakingBad.breakingBadState.serialInfo).map(([index, oneSerialInfo]) =>
                            <li className="serial-info__right-side__li" key={index}>
                                {typeof oneSerialInfo !== 'object'
                                    ?   <div className="serial-info__all"><p className="serial-info__titles">{index}:</p><p className="serial-info__values">{oneSerialInfo}</p></div>
                                    :   <ul>
                                        {oneSerialInfo.map((oneInfoFromArr, oneIndex) =>
                                            <li key={oneIndex}>
                                                {typeof oneInfoFromArr !== 'object'
                                                    ?   <div className="serial-info__all"><p className="serial-info__titles">{oneIndex}:</p><p className="serial-info__values">{oneInfoFromArr}</p></div>
                                                    :   <ul>
                                                        {Object.entries(oneInfoFromArr).map(([objIndex, objVal]) =>
                                                            <li key={objIndex}><div className="serial-info__all"><p className="serial-info__titles">{objIndex}:</p><p className="serial-info__values">{objVal}</p></div></li>
                                                        )}
                                                        </ul>
                                                }
                                            </li>
                                        )}
                                        </ul>
                                }
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
});

export default SerialInfo;