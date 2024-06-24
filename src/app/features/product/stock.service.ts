import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StockView } from '../../model/view-model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://localhost:44398/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getStockList(dataSend: any, userName: string = 'CUSTOMER'): Observable<StockView[]> {
    let url2call = "api/system/getHAWebPrdLst";

    return this.authService.getToken(userName, 'DoctorWeb').pipe(
      switchMap(token => {
        if (!token) {
          // Handle token retrieval failure
          return throwError('Failed to retrieve token');
        }
        return this.authService.makeApiCall<StockView[]>(url2call, dataSend, userName, token);
      })
    );
  }
}
