import { IClairReport } from './../../entities/ClairReport';
import { config } from './../../../assets/config/configuration';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ICompany } from './Company';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
})
export class BlankPageComponent implements OnInit {
    constructor(private http:HttpClient) {}  
    clair:IClairReport;
    high:number;
    low:number;

    ngOnInit() {

        console.log("app Name ----------------");
        console.log(localStorage.getItem('appName'));

        //custom docker image clair analysis
        if(localStorage.getItem('clairFlag') === '1'){            
            console.log("NEXUS BUILD ==> "+config.frontEndUrl+'CA/clairNexusReports/'+localStorage.getItem('imageName&Tag')+'.json');
            //this.http.get<IClairReport>('./assets/rulesengin.json').subscribe(
                this.http.get<IClairReport>(config.frontEndUrl+'CA/clairNexusReports/'+localStorage.getItem('imageName&Tag')+'.json').subscribe(
                    data => {              
                        console.log(data);
                        this.clair=data;
                        console.log("Vulnerabilities ********");
                        
                        console.log("Vulnerabilities ********");
                        console.log(this.clair.Vulnerabilities);
                        console.log("Vulnerabilities end ********");
                        console.log("Vulnerabilities High ********");
                        console.log(this.clair.Vulnerabilities.High);
                        this.high=this.clair.Vulnerabilities.High.length;
                        console.log("Vulnerabilities High end ********");
                        console.log("Vulnerabilities Low ********");
                        console.log(this.clair.Vulnerabilities.Low);
                        this.low=this.clair.Vulnerabilities.Low.length;
                        console.log("Vulnerabilities Low end ********");
                    },
                    (err: HttpErrorResponse) => {
                    console.log (err.message);
                    }
                );
        }
        else{
            console.log("APPLICATION BUILD::::"+config.frontEndUrl+'CA/clairReports/'+localStorage.getItem('appName')+'.json');
            //build image clair analysis            
            this.http.get<IClairReport>(config.frontEndUrl+'CA/clairReports/'+localStorage.getItem('appName')+'.json').subscribe(        
                data => {    
                             
                    this.clair=data;
                    console.log("Vulnerabilities ********");
                    console.log(this.clair.Vulnerabilities);
                    console.log("Vulnerabilities end ********");
                    console.log("Vulnerabilities High ********");
                    console.log(this.clair.Vulnerabilities.High);
                    this.high=this.clair.Vulnerabilities.High.length;
                    console.log("Vulnerabilities High end ********");
                    console.log("Vulnerabilities Low ********");
                    console.log(this.clair.Vulnerabilities.Low);
                    this.low=this.clair.Vulnerabilities.Low.length;
                    console.log("Vulnerabilities Low end ********");
                },
                (err: HttpErrorResponse) => {
                console.log (err.message);
                }
            );
        }        
    }


}
