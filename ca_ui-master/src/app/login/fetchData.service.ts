import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ICompany } from '../entities/Company';
import { IUser } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  private productUrl = '';

  constructor(private http: HttpClient) { }

    username :string="deepak1994";
   

    getUserByUsername(): Observable<IUser> 
    {
         return this.http.get<IUser>('http://localhost:8090/user').pipe(
         tap(data => console.log('All: ' + JSON.stringify(data))),
         catchError(this.handleError)
     );
    }

    getCompnayNameByCID(cid:number) :Observable<ICompany> 
    {
        // let cid=localStorage.getItem('cid');        
        return this.http.get<ICompany>("http://localhost:8090/company/"+cid).pipe(
         tap(data => console.log('All: ' + JSON.stringify(data))),
         catchError(this.handleError)
     );
    }
    
//   getProducts(): Observable<IProduct[]> {
//     return this.http.get<IProduct[]>(this.productUrl).pipe(
//       tap(data => console.log('All: ' + JSON.stringify(data))),
//       catchError(this.handleError)
//     );
//   }

//   getProduct(id: number): Observable<IProduct | undefined> {
//     return this.getProducts().pipe(
//       map((products: IProduct[]) => products.find(p => p.productId === id))
//     );
//   }

  public  handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}