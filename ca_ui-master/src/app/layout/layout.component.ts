import { PortfolioDetails } from './../shared/services/PortfolioDetails';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { tap, map,mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ICompany } from '../entities/Company';
import { IUser } from '../entities/User';
import { config } from '../../assets/config/configuration';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    
    //template-defined property
    collapedSideBar: boolean;

    constructor(private http:HttpClient,private router:Router,public portfolioDetails:PortfolioDetails) {}
    
    //properties
    username = localStorage.getItem('username');
    user : IUser;    
    company: ICompany;
    companyId:number;
    companyName:string;
    myHeaders = new HttpHeaders();

    
   
    ngOnInit() {

        //alert("username in layout dashboard "+localStorage.getItem("username"));

        // this.http.get<IUser>(config.url+'user')
        // .subscribe(userdata => {
        //     this.user=userdata;                
        //     this.companyId=userdata.user.companyId;
        //     this.portfolioDetails.setUsername(userdata.user.username);
        //     localStorage.setItem('roleId',this.user.user.roleId.toString());       
        // });

        /*this.http.get('http://localhost:8090/user')
        .pipe(                            
            mergeMap((userdata) => this.http.get<ICompany>('http://localhost:8090/company/1'))           
        ) */      
        

        /* 
            Calling two get request to fetch user data and then the company of
            the logged-in user by passing the userId retured in first get request  
        */

        //get user by username

/*        this.http.get<IUser>(config.url+'user')
        .subscribe(userdata => {
            this.user=userdata;                
            this.companyId=userdata.user.companyId;
                if(this.username!='admin'){
                    localStorage.setItem('companyId',this.companyId.toString());
                }               
            localStorage.setItem('userId',userdata.user.userId.toString());
            console.log(this.user);
                this.http.get<ICompany>(config.url+'company/'+this.companyId)
                .subscribe(companydata =>{                  
                    this.company=companydata;
                    this.companyName=this.company.company.companyName;  
                    localStorage.setItem('companyName',this.companyName);               
                console.log(this.company);
                },error => {
                    console.log(error);
                    if(error.error.company==null && error.status==500)
                    {
                        this.router.navigate(['/login']);
                    }
                })        
        })*/
             
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    
}
