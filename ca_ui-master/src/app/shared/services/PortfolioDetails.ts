import { HttpClient,HttpHeaders } from "@angular/common/http";
import { config } from '../../../assets/config/configuration';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioDetails {
   
    private showCompanyNameAndUsername:boolean=false;
    private companyName:string;
    private username:string;
    public amtFlag:boolean=false;
    public marketPlaceFlag:boolean=false;
    public roleId:number;
    public multipartFlag:boolean=false;
    constructor(private http:HttpClient) {
         
    }

    getCompanyName(){
        return this.companyName;
    }

    getUsername(){
        return this.username;
    }

    getCompanyNameAndUsername(){
        return this.showCompanyNameAndUsername;
    }

    showCompanyNameAndUsernameDetails(){
        this.showCompanyNameAndUsername=true;
    }

    hideCompanyNameAndUsernameDetails(){
        this.showCompanyNameAndUsername=false;
    }

    setCompanyname(companyName){
        this.companyName=companyName;
    }

    setUsername(username){
        this.username=username;
    }

}