import RootStore from '../storeMobx'

export const episodesTabsWeather = {
    episodesTabsWeatherData: {
        deaths: {},
        city: '', // Albuquerque
        weatherModel: null,
        errorFromFetch: false,
        errorFromCondition: false
    },

    setDeathsModel: function (episode) {
        this.deaths = Object.entries(RootStore.breakingBad.breakingBadState.deaths).filter(deathFromArr => +deathFromArr[1].episode === +episode.episode)
    },

    fetchWeather: async function (reverseAirDate) {
        let numsStr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let strHasNum = true
        await numsStr.forEach(num => this.city.split('').includes(num) ? strHasNum = false : false)
        if(this.city.length > 0 && strHasNum === true){
            try {
                const apiKey = '3ed4de1e2c375d462d81f6766d97f259'

                // convert to unix

                const dateStr = reverseAirDate;
                const date = new Date(dateStr);
                const timestampInMs = date.getTime();
                const unixTimestamp = Math.floor(timestampInMs / 1000);

                const coord = {}

                const responseGetCoord = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&dt=${unixTimestamp}&appid=${apiKey}`)
                const weatherForCoord = await responseGetCoord.json()
                coord.lat = weatherForCoord.coord.lat
                coord.lon = weatherForCoord.coord.lon

                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${coord.lat}&lon=${coord.lon}&dt=${unixTimestamp}&appid=${apiKey}`)
                const weather = await response.json()
                this.weatherModel = {...weather.data[0].weather[0]}
            } catch (e) {
                this.errorFromFetch = true
                console.error(`Error fetching: ${e}`)
            }
        } else {
            this.errorFromCondition = true
        }
    }
}