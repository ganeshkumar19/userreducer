import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

const PopUp = () => {
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [showConfetti, setShowConfetti] = useState(false);
    const [fade, setFade] = useState(false); // New state to control the fade effect

    const detectSize = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize);
        };
    }, []);

    useEffect(() => {
        let fadeOutTimer;
        let removeTimer;
        if (showConfetti) {
            fadeOutTimer = setTimeout(() => {
                setFade(true); 
            }, 4500);
            removeTimer = setTimeout(() => {
                setShowConfetti(false); 
                setFade(false);
            }, 5000);
        }
        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(removeTimer);
        };
    }, [showConfetti]);

    return (
        <>
            <button onClick={() => setShowConfetti(true)}>Click me</button>
            {showConfetti && <div style={{ opacity: fade ? 0 : 1, transition: 'opacity 0.5s' }}>
                <ReactConfetti width={windowDimension.width} height={windowDimension.height} />
            </div>}
        </>
    );
};

export default PopUp;