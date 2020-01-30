import { PortfolioDetails } from './../../shared/services/PortfolioDetails';
import { ICompany } from './../../entities/Company';
import { config } from './../../../assets/config/configuration';
import { IUser } from './../../entities/User';
import { Router,ActivatedRoute  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-redirect-page',
    templateUrl: './redirect-page.component.html',
    styleUrls: ['./redirect-page.component.scss'],
    animations: [routerTransition()]
})
export class RedirectPageComponent implements OnInit {

    user:IUser;
    company:ICompany;
    roleId:number;

    constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,public portfolioDetails:PortfolioDetails) {       
                 
    }    
    
    ngOnInit() {

        this.http.get<IUser>(config.url+'user')
        .subscribe(userdata => {
            this.user=userdata;                       
            this.roleId=this.user.user.roleId; 
            this.portfolioDetails.roleId=this.roleId;
            let tokenObj = localStorage.getItem('token');
            console.log(localStorage.getItem('token'));
            let sendTokenObj = JSON.parse('{"' + decodeURI(tokenObj.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
            localStorage.setItem('username',sendTokenObj.username);
            if(this.roleId === 1)
            {
                console.log("admin logged in");
                //alert("admin logged in");
                this.router.navigate(['../adminhome'],{relativeTo: this.route});
            }  
            else{
                console.log("user logged in");
                //alert("user logged in");
                //this.router.navigate(['../adminhome'],{relativeTo: this.route});
                this.router.navigate(['/dashboard']);
            }
        });

        
        
        // if(localStorage.getItem('username') ==='admin')
        // {
        //     console.log("admin logged in");             
        // }  
        // else{
        //     console.log("user logged in");
        //     this.router.navigate(['/dashboard']);
        // }            
    }
}
