import React, {useEffect} from 'react';
import {animateItems} from "../mixins/animation/animateItems";

const ErrorPage = () => {
    useEffect(() => {
        animateItems()
    }, [])

    return (
        <main className="main">
            <p className='error-page anim-items' style={{fontSize: '50px', display: 'flex', justifyContent: 'center', marginTop: '200px', color: 'red', fontWeight: '900'}}>Page
                is not found !!!</p>
        </main>
    );
};

export default ErrorPage;