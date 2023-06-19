import React from "react";

const WeatherIcon = ({ iconId }) => {
    const iconPath = `resources/icons/${iconId}.svg`;
    return <img src={iconPath} alt="Icone météo" />;
};

export default WeatherIcon;
