import './BmiCard.css';

import appData from '../utility/utility';
import Logo from '../assets/logo.jpeg';

function BmiCard(number) {
    const phoneNumber = number?.number || '';
    const traineesData = appData.traineesData;
    const exerciseRoutine = phoneNumber?.length === 10 && appData.traineesData[phoneNumber] && appData.traineesData[phoneNumber].exerciseRoutine;

    const firstPart = exerciseRoutine ? exerciseRoutine?.slice(0, 2) : [];
    const secondPart = exerciseRoutine ? exerciseRoutine?.slice(2, 6) : [];

    const fetchName = (name) => {
        let nameArr = name.split(" ");

        return nameArr.length === 1 ? nameArr[0] : nameArr[0] + " " + nameArr[nameArr.length - 1];
    }

    return (
        <>
            {phoneNumber?.length === 10 && appData.traineesData[phoneNumber] ?
                <div>
                    <div className="BmiCard-container" id='bmiCard-container'>
                        <div className="BmiCard-top-section">
                            <div className="BmiCard-gym-details">
                                <div className='BmiCard-gym-details-left'>
                                    <div className="BmiCard-gym-logo">
                                        <img src={appData.logo} alt="Gym Logo" />
                                    </div>
                                </div>
                                <div className='BmiCard-gym-details-right'>
                                    <div className="BmiCard-gym-name">
                                        {appData.gymName}
                                    </div>
                                    <div className="BmiCard-gym-address-card">
                                        {appData.address}
                                        <br />
                                        {appData.contact}
                                        <br />
                                        {appData.website}
                                    </div>
                                </div>
                            </div>
                            <div className='BmiCard-personal-details'>
                                <div className="BmiCard-personal-details-left">
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Name
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber]?.longName ? fetchName(traineesData[phoneNumber].name) : traineesData[phoneNumber].name}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Age
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].age || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Weight
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].weight || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Height
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].height || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Fat%
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].Fat || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            VF%
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].VF || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-left-row'>
                                        <div className='BmiCard-personal-details-left-row-field'>
                                            Water
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-left-row-value'>
                                            {traineesData[phoneNumber].water || '-'}
                                        </div>
                                    </div>
                                </div>

                                <div className="BmiCard-personal-details-right">
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            Date
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].date || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            Shld No
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].shldNo || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            Injuries
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].injuries || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            Gender
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].gender || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            Program
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].program || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            MM%
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].MM || '-'}
                                        </div>
                                    </div>
                                    <div className='BmiCard-personal-details-right-row'>
                                        <div className='BmiCard-personal-details-right-row-field'>
                                            BMI
                                        </div>
                                        :
                                        <div className='BmiCard-personal-details-right-row-value'>
                                            {traineesData[phoneNumber].bmi || '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="BmiCard-bottom-section">
                            <div className="BmiCard-bottom-section-header">
                                <div className="BmiCard-bottom-section-header-routine">
                                    Strength Exercise Routine
                                </div>
                                <div className="BmiCard-bottom-section-header-set">
                                    Set
                                </div>
                                <div className="BmiCard-bottom-section-header-rep">
                                    Rep
                                </div>
                            </div>
                            <div className="BmiCard-bottom-section-content">
                                {firstPart.map((routine, index) => (
                                    <div className="BmiCard-exercise-table" key={index}>
                                        <table >
                                            <thead >
                                                <tr>
                                                    <th>{`DAY ${index + 1} - ${routine.heading}`}</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {routine.exerciseList.map((ex, index) => (
                                                    <tr key={index}>
                                                        <td>{ex.name}</td>
                                                        <td>{ex.set}</td>
                                                        <td>{ex.rep}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="BmiCard-container-2" id='bmiCard-container2'>
                        {secondPart.map((routine, index) => (
                            <div className="BmiCard-exercise-table" key={index}>
                                <table >
                                    <thead >
                                        <tr>
                                            <th>{`DAY ${index + 3} - ${routine.heading}`}</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {routine.exerciseList.map((ex, index) => (
                                            <tr key={index}>
                                                <td>{ex.name}</td>
                                                <td>{ex.set}</td>
                                                <td>{ex.rep}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div> :
                <div className="noDataFound" id='no-data-found'>
                    <img src={Logo} alt="No Data Found" />
                    <h2>No Data Found</h2>
                </div>
            }
        </>
    )
}

export default BmiCard
