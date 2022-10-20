import React from 'react';
import RootStore from '../../storeMobx'

const Occupations = () => {
    return (
        <div className="occupations anim-items">
            <ul className="occupations__ul">
                {Object.entries(RootStore.breakingBad.breakingBadState.occupations).map(([value, occups]) =>
                    <li className="occupations__li" key={value}>
                        <p className="occupations__li__value">{value}:</p>
                        <ul className="occupations__li__occup-ul">
                            {Object.entries(occups).map(([index, occupOne]) =>
                                <li className="occupations__li__occup-li" key={index}>{occupOne};</li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Occupations;