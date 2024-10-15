export class WeatherDto {
    temp: number
    humidity: number
    descriptionTemp: string
    descriptionHumidity: string
    city: string

    constructor(response) {
        this.city = response.location.name
        this.temp = response.current.temp_c
        this.humidity = response.current.humidity
    }

    writeDescription() {
        if (this.temp < 10) {
            this.descriptionTemp = 'Cold'
        }
        else if (this.temp < 20) {
            this.descriptionTemp = 'Warm'
        }
        else {
            this.descriptionTemp = 'Hot'
        }
        if (this.humidity < 40) {
            this.descriptionHumidity = 'Dry'
        }
        else if(this.humidity > 40 && this.humidity < 70) {
            this.descriptionHumidity = 'optimal humidity'
        }
        else if(this.humidity > 70 && this.humidity < 80) {
            this.descriptionHumidity = 'Damp'
        }else{
            this.descriptionHumidity = 'Fog'
        }
    }
}