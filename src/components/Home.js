import './Home.css';

import { useState } from 'react';
import html2pdf from 'html2pdf.js';

import BmiCard from './BmiCard';
import appData from '../utility/utility';

function Home() {
    const [number, setNumber] = useState('');

    const handleSubmit = () => {
        const element = document.getElementById(appData.traineesData[number] ? 'bmiCard-container' : 'no-data-found');

        html2pdf()
            .from(element)
            .set({
                margin: 10,
                filename: 'bmi-card.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
            })
            .save();
    };


    return (
        <div className="home">
            <h1 className="home-title">
                Enter your number
            </h1>
            <div className="home-input">
                <input
                    type="number"
                    placeholder="Phone number"
                    value={number}
                    max={10}
                    onChange={e => setNumber(e.target.value)}
                />
                <button onClick={handleSubmit}disabled={number.length === 10 && appData.traineesData[number] ? false : true}>
                    Download
                </button>
            </div>
            <div style={{ display: 'none' }}>
                {number.length === 10 && <BmiCard number={number} />}
            </div>
            {number.length === 10 && !appData.traineesData[number] &&
                <div className='error-banner'>
                    Oops!!! No data found
                </div>
            }
            {number.length !== 10 &&
                <div className='error-banner'>
                    Enter a valid 10 digit number
                </div>
            }
        </div>
    );
}

export default Home;
