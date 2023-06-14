import  "./../../css/MeteoStyle.css";
import { useState, useEffect} from "react";
import Loader from '/resources/icons/Loader.jsx';
import Browser from '/resources/icons/Browser.jsx'
import IconPath from './IconPath.jsx';

export default function BlockDashboardMeteo({ apiKey }) {

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setAPIState({ loading: true, error: false, data: undefined });

        const response = await fetch(
            `http://api.airvisual.com/v2/nearest_city?key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(
              `Erreur ${response.status}, ${response.statusText}`
          );
        }

        const responseData = await response.json();

        const sortedData = {
          city: responseData.data.city,
          country: responseData.data.country,
          iconId: responseData.data.current.weather.ic,
          temperature: responseData.data.current.weather.tp
        };
        setAPIState({ loading: false, error: false, data: sortedData });
      } catch (error) {
        setAPIState({ loading: false, error: true, data: undefined });
      }
    };

    getWeatherData();
  }, [apiKey]);

  let content;
  if (APIState.loading) {
    content = (
        <div className="loader-container active">
          {APIState.loading && <Loader alt="loader" className="loader" />}
        </div>
    );
  } else if (APIState.error) {
    content = <p>Erreur lors de la récupération des données.</p>;
  } else if (APIState.data) {
    const { city, country, temperature, iconId } = APIState.data;
    const iconSrc = `/resources/icons/${iconId}.svg`;

    content = (
        <div className="text-center">
          <p className="error-information"></p>
          <p className="city-name">{city}</p>
          <p className="country-name">{country}</p>
          <p className="temperature">{temperature}°</p>
          <IconPath iconId={iconId} />
        </div>
    );
  }

  return (
      <div className="relative">
        <div className="h-full space-y-6 group p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/50 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          {content}
        </div>
      </div>
  );
}
