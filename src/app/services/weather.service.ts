import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){}

  getWeatherInformation(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b5e15297fb7afbce9fe2b0cf7bf5f5f`;

    return this.http.get<any>(url);
  }
}
