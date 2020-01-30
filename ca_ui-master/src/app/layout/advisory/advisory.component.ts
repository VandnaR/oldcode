import { ITwelveFactor } from './../../entities/TwelveFactor';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { IApplicationBean } from '../../entities/ApplicationBean';
import { IAssessment } from '../../entities/Assessment';
import { IAssessmentDetails } from '../../entities/AssessmentDetails';
import { Observable } from 'rxjs';
import { ICategory} from '../../entities/Category';
import { IAnswerOption } from '../../entities/AnswerOption';
import { IQuestion } from '../../entities/Question';
import { IAdvisorySurvey2 } from '../../entities/AdvisorySurvey2';
import { IPMDBean} from '../../entities/PMDBean'; 
import { ITwelveFactorAdvisory} from '../../entities/TwelveFactorAdvisory'; 

import { config } from '../../../assets/config/configuration';
import { AssessmentService } from '../assessment/assessment.service';
import { IBuildOrDeployStatus } from '../../entities/BuildOrDeployStatus';
import { ITwelveFactorReport } from '../../entities/TwelveFactorReport';

@Component({
    selector: 'app-advisory',
    templateUrl: './advisory.component.html',
    styleUrls: ['./advisory.component.scss'],
    animations: [routerTransition()]
})
export class AdvisoryComponent implements OnInit {
      
    constructor(private http:HttpClient, private assessmentService: AssessmentService) {
        //getting all the categories
        /*this.http.get<ICategory[]>(config.url+'category')
        .subscribe(appdata => {                                                             
            this.category=appdata;
            console.log(this.category);                                  
        });*/

        //getting all questions by survey Id 2
        this.http.get<IQuestion[]>(config.url+'survey/2/questions')
            .subscribe(appdata => {                                                             
                this.questions=appdata;                
                 console.log(this.questions);                                      
        });

        
        this.http.get<IAnswerOption[]>(config.url+'question/37/answerOptions')
        .subscribe(appdata => {                                
            this.answerOptions=appdata;                                      
        }) 

        console.log("C appId"+this.appId);
    }

    title = '';
    showRB=false;
    mapByQID = new Map();
    answerOptions: IAnswerOption[];
    questions: IQuestion[];
    showRB2=false;

    appName;
    appId=+localStorage.getItem('appId');
  
    //applId=localStorage.getItem('applId');    
    
    username = localStorage.getItem('username');
    projects : IProject[];
    applications : IApplication[];
    cid =localStorage.getItem('companyId');

    category : ICategory[];
    advisorySurvey2: IAdvisorySurvey2[];
    showAdvisorySurvey2= false;
    surveyResponseId=localStorage.getItem('surveyResponseId');
    assessmentId;

    assessmentDetails : IAssessmentDetails[];
    twelveFactorAdvisory: ITwelveFactorAdvisory[];
    twelveFactorReport: ITwelveFactorReport[];

    mapByCategory = new Map();
    mapByScore =new Map();

    showLoad=false;
    showCompleted=false;
    alertMessage="";

    pmdFileLink;
    frontEndUrl;

    public avgScore: any;

    public selectedValue:any;
    public msg = "This Advisory tabs are not applicable because your application is based on ERP/CRM/SCM/Mainframe "+ 
    "or using old technologies like Powerbuilder, MSAccess, VB etc.";
    // companyName:string;     

    //chart for 12 factor 
    twelveFactor: ITwelveFactor[];
    // company portfolio bar chart
    public platform12factorBarChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,                                
                            }
                        }],
                    yAxes: [{                       

                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Percentage (%)'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 10,
                                max: 100,                                
                            }                            
                        }]   
                }
       /*scales: {
                    xAxes: [{
                           display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Total No Of Apps %'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 20,                                
                            }
                        }],
                    yAxes: [{
                        display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Applications'
                            }                            
                        }]
                }*/
    };
    public platform12factorBarChartLabels: string[]=[
       
    ];

    //public barChartType: string = 'horizontalBar';
    public platform12factorBarChartType: string = 'bar';
    public platform12factorBarChartLegend: boolean = false;

    public platform12factorBarChartData: any[] = [
         
    ];

    public platform12factorBarChartColors: Array<any> = [
        {            
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'                
            ],
            borderWidth: 1
        }        
    ];






    ngOnInit() {           

        console.log("---------------");
        console.log(this.appId);
        this.selectedValue= localStorage.getItem('yesOption');
        this.twelveFactorReport= this.assessmentService.getTwelveFactorReport();
        this.http.get<IApplicationBean>(config.url+'application/'+this.appId)
            .subscribe(appdata => {                                
                this.appName=appdata.application.appName;                                      
            }) 

        this.showCompleted=false;
        this.showLoad=false;
        this.frontEndUrl=config.frontEndUrl;
        this.http.get<IAssessment>(config.url+'surveyResponse/'+this.surveyResponseId+'/assessment')
            .subscribe(res => {   
                this.assessmentId=res.assessmentId;
                console.log(this.assessmentId);                         
                console.log(res); 
                 this.http.get<IAssessmentDetails[]>(config.url+'assessment/'+this.assessmentId+'/assessmentDetails')
                .subscribe(res => { 
                    this.assessmentDetails=res;
                    this.createMap();                    
                    console.log(res); 

                    //12 factor compatibility chart

                    this.http.get<ITwelveFactor[]>(config.url+'12Factor/'+this.appId)
                    .subscribe(appdata => {                                                             
                        this.twelveFactor=appdata;
                        console.log(this.twelveFactor);            
                        let noOfApps:any[]=[];
                        let bg="";
                        for(let val of this.twelveFactor){                            
                            this.platform12factorBarChartLabels.push(val.type);               
                            noOfApps.push(val.score);
                        }            
                        this.platform12factorBarChartData=[{ data: noOfApps}];                                                                             
                    })  


                })                        
            },
            err=>{
                    //alert("Assessment is not submitted for this survey!");
                    this.alertMessage="Assessment is not submitted for survey! Please select any survey to view Containerization advisory";
            })                            
    }

    performFilterByCategory(filterBy: string): IAssessmentDetails[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.assessmentDetails.filter((assess: IAssessmentDetails) => assess.categoryName.toLocaleLowerCase()===filterBy);
    }

    createMap(){
        this.avgScore = 0;
        let count=0;
        for(let cat of this.getCategory())
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
            if(isNaN(per)){
                per=0;
            }
            this.avgScore =this.avgScore + per;
            count = count+1;
            console.log("per is "+per);           
            this.mapByScore.set(cat.categoryName,per);
            this.mapByCategory.set(cat.categoryName,val);
            //console.log(this.mapByScore.get(cat.categoryName));
        }
        this.avgScore=Math.floor(this.avgScore * 100) / 100; 
        this.avgScore =this.avgScore/count;
        this.avgScore=Math.floor(this.avgScore * 100) / 100; 
        console.log("this.avgScore is "+this.avgScore);        
    }
    
    onPlatformChange(answerOptionsId: number){
        this.showAdvisorySurvey2=true;

        //alert(answerOptionsId);
        let answerOptionsIdNo=+answerOptionsId;
        /*alert(answerOptionsIdNo);
        alert(this.surveyResponseId);*/

        this.http.get<IAdvisorySurvey2[]>(config.url+'advisorySurvey2/'+answerOptionsIdNo+"/"+this.surveyResponseId)
            .subscribe(appdata => {   
                //console.log(appdata);                             
                this.advisorySurvey2=appdata;                
            }) 
    }

    getCategory(){
        return this.assessmentService.getAllCategories();
    }

   /* onPMDAnalyze(gitURL,typeOfReport){        

        this.showLoad=true;
        console.log("PMD app Id"+this.appId);              
        this.http.post<IPMDBean>(config.url+'pmd',
        //this.http.post<IPMDBean>(config.url+'pmdwin',
        {
            "gitUrl": gitURL.value,
            "typeOfReport": typeOfReport.value,
            "appId": this.appId
        })
        .subscribe(
            res => {
                console.log(res);
                this.pmdFileLink=res.filePath;
                this.showLoad=false;
                this.showCompleted=true;
                 //get twelveFactorAdvisory
                // this.http.get<ITwelveFactorAdvisory[]>(config.url+'twelveFactorAdvisory/'+this.appId)
                // .subscribe(appdata => {                                
                //     this.twelveFactorAdvisory=appdata;   
                //     console.log("Advisory 12 factor"+ this.appId);
                //     console.log(this.twelveFactorAdvisory);                                     
                // })

                //12factor_report
                this.http.get<ITwelveFactorReport[]>(config.url+'twelveFactorReport/'+this.appId)
                .subscribe(appdata => {                                
                    this.twelveFactorReport=appdata;   
                    console.log("Report 12 factor"+ this.appId);
                    console.log(this.twelveFactorReport);                                     
                })
            },
            err => {
              console.log(err);       
            }
        );
    }*/
        
}

