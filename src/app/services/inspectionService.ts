import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CopyRequestDto } from '../models/copyRequestDto';
import { Inspection } from '../models/inspection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InspectionService { 
  private url = 'Inspection';
  private API_URL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {}

  // sends get request to the API endpoint and expects an array of inspection objects in response
  getInspections(): Observable<Inspection[]> {
    return this.httpClient.get<Inspection[]>(`${this.API_URL}/${this.url}`);
  }
 // sending post request to the copy endpoint; resonse set to plain text
  copyInspection(copyRequest: CopyRequestDto): Observable<any> {
    return this.httpClient
      .post(`${this.API_URL}/${this.url}/Copy`, copyRequest, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Failed to copy inspection:', error);
          this.handleError();
          return throwError(error);
        })
      );
  }

  handleError(): void {
    console.error('An error occurred during API call.');
  }
}
