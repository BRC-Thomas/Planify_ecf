import React from 'react';
import icon01d from '/resources/icons/01d.svg';
import icon01n from '/resources/icons/01n.svg';
import icon02d from '/resources/icons/02d.svg';
import icon02n from '/resources/icons/02n.svg';
import icon03d from '/resources/icons/03d.svg';
import icon03n from '/resources/icons/03n.svg';
import icon04d from '/resources/icons/04d.svg';
import icon04n from '/resources/icons/04n.svg';
import icon09d from '/resources/icons/09d.svg';
import icon09n from '/resources/icons/09n.svg';
import icon11d from '/resources/icons/11d.svg';
import icon11n from '/resources/icons/11n.svg';
import icon13d from '/resources/icons/13d.svg';
import icon13n from '/resources/icons/13n.svg';
import icon50d from '/resources/icons/50d.svg';
import icon50n from '/resources/icons/50n.svg';

export default function IconPath({ iconId }) {
    let iconSrc;

    switch (iconId) {
        case '01d':
            iconSrc = icon01d;
            break;
        case '01n':
            iconSrc = icon01n;
            break;
        case '02d':
            iconSrc = icon02d;
            break;
        case '02n':
            iconSrc = icon02n;
            break;
        case '03d':
            iconSrc = icon03d;
            break;
        case '03n':
            iconSrc = icon03n;
            break;
        case '04d':
            iconSrc = icon04d;
            break;
        case '04n':
            iconSrc = icon04n;
            break;
        case '09d':
            iconSrc = icon09d;
            break;
        case '09n':
            iconSrc = icon09n;
            break;
        case '11d':
            iconSrc = icon11d;
            break;
        case '11n':
            iconSrc = icon11n;
            break;
        case '13d':
            iconSrc = icon13d;
            break;
        case '13n':
            iconSrc = icon13n;
            break;
        case '50d':
            iconSrc = icon50d;
            break;
        case '50n':
            iconSrc = icon50n;
            break;

        default:
            iconSrc = null;
            break;
    }

    return (
        <div className='info-icon-container relative'>
            {iconSrc && <img src={iconSrc} alt="Logo météo" className={'info-icon'} />}
        </div>
    );
}
