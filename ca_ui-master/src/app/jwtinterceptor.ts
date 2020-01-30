import { PortfolioDetails } from './shared/services/PortfolioDetails';
import { Injectable } from '@angular/core';
import { config } from './../assets/config/configuration';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private router: Router,private portfolioDetails:PortfolioDetails) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(!config){
      return next.handle(request);
    }
    let tokenObj = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    let sendTokenObj = JSON.parse('{"' + decodeURI(tokenObj.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    
    console.log("Interceped!!");  
    console.log(sendTokenObj.username);
    console.log(sendTokenObj.token);
    console.log(sendTokenObj.refreshToken);
    console.log(sendTokenObj.expiresIn);
    console.log("-------------------");
	//condition based interceptor
	if(localStorage.getItem('interceptFlag')){
    console.log("In cluster creation interceptor");
         localStorage.removeItem('interceptFlag');
          const authReq = request.clone({
            headers: new HttpHeaders({ 
            'Authorization': 'Basic YWRtaW46a3ViZUplbmtpbnM0M0Ax'
          })
        });
        return next.handle(authReq);
  }else if(this.portfolioDetails.amtFlag)
  {
    console.log("In amt interceptor");    
    //localStorage.removeItem('amtFlag');
    this.portfolioDetails.amtFlag=false;
    const authReq=request.clone(
      {        
          headers: new HttpHeaders({
          'clientAppId': config.clientAppId,
          'clientAppSecret': config.clientAppSecret,
          'authorizationToken': sendTokenObj.token, 
          'username': localStorage.getItem('username')         
      })});
     return next.handle(authReq);
  }else if(this.portfolioDetails.marketPlaceFlag)
  {
    console.log("In marketplace interceptor");    
    //localStorage.removeItem('amtFlag');
    this.portfolioDetails.marketPlaceFlag=false;
    const authReq=request.clone(
      {        
          headers: new HttpHeaders({
          'clientAppId': config.clientAppId,           
          'username': localStorage.getItem('username')         
      })});
     return next.handle(authReq);
  }
  else if (this.portfolioDetails.multipartFlag)
  {
    console.log("In multipart interceptor");    
          const authReq = request.clone({
            headers: new HttpHeaders({ 
              'clientAppId': config.clientAppId,
              'clientAppSecret': config.clientAppSecret,
              'authorizationToken': sendTokenObj.token,
              'username': sendTokenObj.username
            })
          });
         return next.handle(authReq); 
    }
  else
  {
    console.log("In general interceptor");    
          const authReq = request.clone({
            headers: new HttpHeaders({ 
              'Content-Type':'application/json',
              'clientAppId': config.clientAppId,
              'clientAppSecret': config.clientAppSecret,
              'authorizationToken': sendTokenObj.token,
              'username': sendTokenObj.username
            })
          });
         return next.handle(authReq); 
    }

	 
    //return next.handle(request);

    // .pipe(
    //   tap((event) => {  
    //     if (event instanceof HttpResponse) {   
         
    //       // http response status code
    //       if(event.status === 204){
    //         console.log('success interceptor');
    //       }
    //       if(event.status === 200){
    //         console.log('success 200');
    //       }
    //       //console.log(event.status);
    //     }
    //   }, (error) => {
    //    // http response status code
    //    let errMsg = "";
    //      if(error.status === 500){
    //       errMsg = 'Error! Internal Server Error';
    //      }else if (error.status === 400){
    //       errMsg = 'Error! Bad Request';
    //      }else if (error.status === 401){
    //       errMsg = 'Error! Unauthorized';
    //     }else if (error.status === 403){
    //       errMsg = 'Error! Forbidden';
    //     }else if (error.status === 404){
    //       errMsg = 'Error! Page Not Found';
    //     }else{
    //       errMsg = error.message;
    //      }

    //       //this.errorService.addErrors([errMsg]);
    //       console.log("--- end of response---");
    //       //this.router.navigate(['productResult']);
    //         return Observable.throw(error);
    //   })
  //);
  }
}