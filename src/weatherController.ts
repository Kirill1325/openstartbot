import axios from "axios";
import { WeatherDto } from "./weatherDto";

export const getWeather = async (city: string) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no
`)
        return new WeatherDto(response.data)
    } catch (e) {
        return new Error(e)
    }
}