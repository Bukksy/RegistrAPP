import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importar catchError
import { throwError } from 'rxjs'; // Importar throwError para manejar el error

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = '4bee5ae000bbf342052b6d7e2e28da97';
  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`; 
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el clima:', error);
        return throwError('Error al obtener el clima, por favor intente de nuevo más tarde.');
      })
    );
  }
}
