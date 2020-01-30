import { ICompany } from './../../entities/Company';
import { IUser } from './../../entities/User';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { config } from '../../../assets/config/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private http:HttpClient,private router: Router) {}

    user:IUser;
    company:ICompany;

    canActivate()
    {        
        if(document.location.search !== ""){
            localStorage.setItem('token',document.location.search.split('?')[1]);
        }
        //debugger;
        if (!localStorage.getItem('token')) {
            //let params = 'token='+res.token.token+'&refreshToken='+res.token.refreshToken+'&expiresIn='+res.token.expiresIn+'&username='+_this.loginForm.value.username;            
            //let param=encodeURIComponent(document.location.origin);
            let redURL = encodeURIComponent(document.location.origin + '/CA&clientAppId=' +config.clientAppId+ '&clientAppSecret=' + config.clientAppSecret);
            
            window.open(config.login_url+"?redirectUrl="+redURL,'_self');

            return false;        
        }else{
        return true;
        }        
    }
}
