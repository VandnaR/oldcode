import { ICompany } from './../entities/Company';

import { config } from './../../assets/config/configuration';

import { IUser } from './../entities/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient,HttpHeaders } from "@angular/common/http";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router,private http:HttpClient) {}

    user:IUser;
    company:ICompany;
    message:string="";
    
    ngOnInit() {}

    onLoggedin(username: HTMLInputElement,password:HTMLInputElement) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('username',username.value);

        //get user by username
        this.http.get<IUser>(config.url+'user')
        .subscribe(userdata => { 
            console.log(config.url);
            this.user=userdata; 
            // console.log(this.user);
            // console.log("********");
            // console.log(this.user.user.password);
            // console.log(btoa(password.value));
            // console.log("********");

            //decode the password from database and compare it with ecoded value of password entered.

            if(this.user.user.password === btoa(password.value))
            {
                //console.log(atob(password.value));
                localStorage.setItem('roleId',this.user.user.roleId.toString());
                //alert(this.user.user.companyId);
                this.http.get<ICompany>(config.url+'company/'+this.user.user.companyId)
                .subscribe(companydata =>{ 
                    this.company=companydata;
                    localStorage.setItem('companyName',this.company.company.companyName);      
                    if(this.user.user.roleId ===1){
                        this.router.navigate(['./adminhome']);
                    }
                    else{
                        this.router.navigate(['/dashboard']);
                    }               
                    // this.companyId=userdata.user.companyId;
                          
                    //localStorage.setItem('userId',userdata.user.userId.toString());
                    console.log(userdata);
                })   
            }
            else{
                console.log("Incorrect password");
                this.message="Incorrect password";
                //console.log(btoa(password.value));
            }
                                 
        },err => {
            console.log("Username doesnot exist!!");
            this.message="Username doesnot exist!!";
            console.log(err.status);
        })
        // if(username.value==='admin')
        // {
        //     this.router.navigate(['./adminhome']);
        // }   
        // else{            
        //     this.router.navigate(['/dashboard']);
        // }   
    }
    
    
}
