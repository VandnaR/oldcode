import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { IAssessment } from '../../entities/Assessment';
import { IAssessmentDetails } from '../../entities/AssessmentDetails';
import { Observable } from 'rxjs';
import { ICategory} from '../../entities/Category';

import { config } from '../../../assets/config/configuration';

@Component({
    selector: 'app-migration',
    templateUrl: './migration.component.html',
    styleUrls: ['./migration.component.scss'],
    animations: [routerTransition()]
})
export class MigrationComponent implements OnInit {
      
    constructor(private http:HttpClient) {
        //getting all the categories
        this.http.get<ICategory[]>(config.url+'category')
        .subscribe(appdata => {                                                             
            this.category=appdata;
            console.log(this.category);                                  
        })
    }

    title = '';
    username = localStorage.getItem('username');
    projects : IProject[];
    applications : IApplication[];
    cid =localStorage.getItem('companyId');

    category : ICategory[];
    surveyResponseId=localStorage.getItem('surveyResponseId');
    assessmentId;

    assessmentDetails : IAssessmentDetails[];

    mapByCategory = new Map();
    mapByScore =new Map();
    // companyId:number;
    // companyName:string;
 
   
    ngOnInit() {      

        this.http.get<IAssessment>(config.url+'/surveyResponse/'+this.surveyResponseId+'/assessment')
            .subscribe(res => {   
                this.assessmentId=res.assessmentId;
                console.log(this.assessmentId);                         
                console.log(res); 
                 this.http.get<IAssessmentDetails[]>(config.url+'/assessment/'+this.assessmentId+'/assessmentDetails')
                .subscribe(res => { 
                    this.assessmentDetails=res;
                    this.createMap();                    
                    console.log(res);                        
                })                        
            })                            
    }

    performFilterByCategory(filterBy: string): IAssessmentDetails[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.assessmentDetails.filter((assess: IAssessmentDetails) => assess.categoryName.toLocaleLowerCase()===filterBy);
    }

    createMap(){
        for(let cat of this.category)
        {
            let val=this.performFilterByCategory(cat.categoryName);
            //console.log(val);
            let sum=0;
            let len=0;
            for(let s of val)
            {
                sum=sum+s.advisoryScore;
                len=len+1;
                
            }            
            let per=(sum/(len*3))*100; 
            //console.log("per is "+per);           
            this.mapByScore.set(cat.categoryName,per);
            this.mapByCategory.set(cat.categoryName,val);
            //console.log(this.mapByScore.get(cat.categoryName));
        }
        console.log(this.mapByCategory);
        
    }
    
        
}

