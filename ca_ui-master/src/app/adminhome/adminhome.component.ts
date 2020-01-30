import { PortfolioDetails } from './../shared/services/PortfolioDetails';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { IAllCompanies } from '../entities/AllCompanies';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { config } from '../../assets/config/configuration';
import { Router } from '@angular/router';


@Component({
    selector: 'app-adminhome',
    templateUrl: './adminhome.component.html',
    styleUrls: ['./adminhome.component.scss'],
    animations: [routerTransition()]
})
export class AdminhomeComponent implements OnInit {
    username = localStorage.getItem('username');
    showSetting;    
    constructor(private http:HttpClient,private router: Router,private portfolioDetails:PortfolioDetails) {

        if(this.username!=="admin")
        {
                this.showSetting=false;
        }
        else{
            this.showSetting=true;
        }

                //getting all companies
                this.http.get<IAllCompanies[]>(config.url+'companies')
                .subscribe(appdata => {                                                             
                    this.allcompany=appdata;
                    console.log(appdata);                                  
                }) 


    }

    allcompany:IAllCompanies[];

    ngOnInit() {}

    onLoggedout() {
        /*localStorage.removeItem('isLoggedin');
        localStorage.removeItem('username');
        localStorage.removeItem('categoryId'); 
        localStorage.removeItem('companyId');
        localStorage.removeItem('companyName');

        localStorage.removeItem('userId');  
        localStorage.removeItem('surveyResponseId');  
        localStorage.removeItem('applId');  
        localStorage.removeItem('appId');  */

        let redURL = encodeURIComponent(document.location.origin + '/CA&clientAppId=' +config.clientAppId+ '&clientAppSecret=' + config.clientAppSecret);                
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('username');
        localStorage.removeItem('categoryId'); 
        localStorage.removeItem('companyId');
        localStorage.removeItem('userId');  
        localStorage.removeItem('surveyResponseId');  
        localStorage.removeItem('applId');  
        localStorage.removeItem('appId'); 
        localStorage.removeItem('token');  
        window.open(config.login_url+"?redirectUrl="+redURL,'_self');
    }

    openDashboard(companyName,companyId){
        //alert(companyName);
        localStorage.setItem('companyName',companyName);
        localStorage.setItem('companyId',companyId);
        this.portfolioDetails.setCompanyname(companyName);
        //alert(companyId);
        this.router.navigate(['/dashboard']);
    }
}
