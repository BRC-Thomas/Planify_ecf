import MeteoStyle from './../../css/MeteoStyle.css';

export default function BlockDashboardMeteo({apiKey}) {


  const loader = document.querySelector(".loader-container");
  const errorInformation = document.querySelector(".error-information");
  const APP_KEY = apiKey;
  async function getWeatherData(){
    try {
      const response = await fetch(`http://api.airvisual.com/v2/nearest_city?key=${APP_KEY}`)

      if(!response.ok) {
        throw new Error(`Error ${response.status}, ${response.statusText}`)
      }

      const responseData = await response.json();

      const sortedData = {
        city: responseData.data.city,
        country: responseData.data.country,
        iconId: responseData.data.current.weather.ic,
        temperature: responseData.data.current.weather.tp,
      }

      populateUI(sortedData)
    }
    catch (error) {
      loader.classList.remove("active");
      errorInformation.textContent = error.message;
    }
  }
  getWeatherData()


  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const temperature = document.querySelector(".temperature");
  const infoIcon = document.querySelector(".info-icon");

  function populateUI(data){
    cityName.textContent = data.city;
    countryName.textContent = data.country;
    temperature.textContent = `${data.temperature}°`;
    infoIcon.src = `ressources/icons/${data.iconId}.svg`;
    infoIcon.style.width = "150px";
    loader.classList.remove("active");
  }

  return (


    <div className=" ">
      <div
        className="h-full space-y-6 group p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/50 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10 ">

        <div class="loader-container active">
          <img src="resources/icons/loader.svg" alt="loader" className="loader"/>
        </div>
        <p class="error-information"></p>
        <p class="city-name">Lille</p>
        <p class="country-name">France</p>
        <p class="temperature">20°</p>
        <div class="info-icon-container">
          <img src="resources/icons/browser.svg" alt="info icon" className="info-icon"/>
        </div>
    </div>
    </div>
  );
}

