//angular imports
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//custom imports
import { IProject } from '../../entities/Project';
import { IQuestion } from '../../entities/Question';
import { ICategory} from '../../entities/Category';
import { IApplication } from '../../entities/Application';
import { IApplicationBean } from '../../entities/ApplicationBean';
import { IAnswerOption } from '../../entities/AnswerOption';
import { ISurveyResponse } from '../../entities/SurveyResponse';
import { ISurveyResponseBean } from '../../entities/SurveyResponseBean';
import { ISurveyResponseQ } from '../../entities/SurveyResponseQ';
import { ISurveyResponseAnswer } from '../../entities/SurveyResponseAnswers';

import { AssessmentService } from './assessment.service';

import { config } from '../../../assets/config/configuration';

@Component({
    selector: 'app-assessment',
    templateUrl: './assessment.component.html',
    styleUrls: ['./assessment.component.scss'],
    animations: [routerTransition()]
})
export class AssessmentComponent implements OnInit {
      
    //injected HttpClient and AssessmentService in constructor  
    constructor(private http:HttpClient,private assessmentService: AssessmentService,private router:Router) {
        
        //getting all questions by survey Id
        this.http.get<IQuestion[]>(config.url+'survey/1/questions')
            .subscribe(appdata => {                                                             
                this.questions=appdata;
                 console.log(this.questions);                                      
            })

        //getting all the categories
       /* this.http.get<ICategory[]>(config.url+'category')
        .subscribe(appdata => {                                                             
            this.category=appdata;
            console.log("**************");                        
            console.log(this.category);                        
        })*/
    }

    //properties    
    env ="dev";        
    showHiddenQuestions = true;
    username = localStorage.getItem('username');
    cid;
    uid =+localStorage.getItem('userId');

    category : ICategory[];
    questions : IQuestion[];        
    projects : IProject[];
    applications : IApplication[];
    surveyResponse: ISurveyResponse[];
    
    projectId;
    applicationId;
    surveyResponseId;

    mapByCategory = new Map();
    mapByQID = new Map();

    //testing submit button
    status = false;
    showNewApp=false;
    showLoad=false;
    
                      
    ngOnInit() {   
        this.showLoad=false;
        localStorage.setItem('yesOption','selectedfalse');
        this.cid=+localStorage.getItem('companyId');
        //this.showHiddenQuestions=this.assessmentService.showHiddenQuestions;
        //getting all projects for the given company of the user
        //alert(this.cid);
        this.http.get<IProject[]>(config.url+'company/'+this.cid+'/projects')
            .subscribe(projectdata => {                
                this.projects=projectdata;
                console.log(this.projects);                                         
            },
            err=>{
                console.log("No projects for the current company Id");
            })   
        this.assessmentService.hiddenCategory=['UI Layer','OS Layer','App Runtime','Business Logic Layer','Data Storage','DevOps','12 Factor Compatibility'];
        this.assessmentService.ERP=8;
        this.assessmentService.hiddenQuesId=[18,19,20,21,22,29,30,43]; 
    }
  
    //getting all applications for the selected project
    getApps(projectId: number)
    {                                      
        if(+projectId!=0)
        {
            this.http.get<IApplication[]>(config.url+'project/'+projectId+'/applications')
            .subscribe(appdata => {                
                this.applications=appdata;
                this.projectId=+projectId;
                //console.log(this.applications);                                        
            },err => {
                    console.log("No application for this project");
                    console.log(err);
            })
        }   
        else {
            alert("Please select a project");                        
        }  

        //mapping questions by category name
        for(let cat of this.getCategory())
        {
            let val=this.performFilterByCategory(cat.categoryName);
            this.mapByCategory.set(cat.categoryName,val);
        }                    

        //mapping answerOptions by QuestionId
        for(let val of this.questions)
        {
            this.http.get<IAnswerOption[]>(config.url+'question/'+val.questionId+'/answerOptions')
            .subscribe(appdata => {                                
                this.mapByQID.set(val.questionId,appdata);                                      
            })
        }        
        console.log(this.mapByQID);                     
        
    }
    
    
    performFilterByCategory(filterBy: string): IQuestion[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.questions.filter((product: IQuestion) => product.category.toLocaleLowerCase()===filterBy);
    }

    saveSurveyResponse(applicationId){ 

        localStorage.setItem('appId',applicationId.toString());
        localStorage.setItem('yesOption','selectedfalse');
        //clearing the all previous survey responses of service
        this.assessmentService.clearSurveyResponseQ();
        this.assessmentService.clearSurveyResponseAnswer();
        this.assessmentService.clearAnsArr();
        let appId;
        //show/hide the new application input
        if(applicationId === "<New>"){
            this.showNewApp=true;
            appId=applicationId;
            this.assessmentService.hiddenCategory=['UI Layer','OS Layer','App Runtime','Business Logic Layer','Data Storage','DevOps','12 Factor Compatibility'];
            this.assessmentService.ERP=8;
        }
        else
        {
            this.showNewApp=false;
            appId=+applicationId;        
            
            this.applicationId=+appId;        
            //getting all the survey response by appId
            this.http.get<ISurveyResponse[]>(config.url+'application/'+appId+'/surveyResponse')
                .subscribe(appdata => {                
                        this.surveyResponse=appdata;
                        //console.log(this.surveyResponse);      
                        for(let val of this.surveyResponse)
                        {
                            //if entry exist for survey id 1 and for selected appId
                            if(val.surveyId == 1)
                            {   
                                //showing all categories if survey is already completed
                                this.assessmentService.hiddenCategory=[];                                
                                this.assessmentService.ERP=0; 

                                //storing the surveyResponseId in localStorage 
                                localStorage.setItem('surveyResponseId',val.surveyResponseId.toString());
                                this.surveyResponseId=val.surveyResponseId;

                                //getting all surveyResponseQ for the given surveyResponseId
                                this.http.get<ISurveyResponseQ[]>(config.url+'surveyResponse/'+val.surveyResponseId+'/surveyResponseQ')
                                .subscribe(appdata => {                                                         
                                    for(let val of appdata)
                                    {
                                       //adding all the SurveyResponseQ into a assessment service
                                        this.assessmentService.addSurveyResponseQ(val);
                                        if(this.assessmentService.hiddenQuesId.includes(val.questionId)){
                                            //console.log(val.surveyResponseId);
                                            this.assessmentService.hiddenQuesId.splice(this.assessmentService.hiddenQuesId.indexOf(val.questionId),1);
                                        }
                                    }                                                         
                                    //console.log("Questions",this.assessmentService.getSurveyResponseQ());
                                },err => {
                                    console.log(err);
                                })

                                //get all surveyResponseAnswers for the given surveyResponseId
                                this.http.get<ISurveyResponseAnswer[]>(config.url+'surveyResponse/'+val.surveyResponseId+'/surveyResponseAnswers')
                                .subscribe(appdata => {   
                                    //this.surveyResponseAnswer=appdata;                                
                                    for(let val of appdata)
                                    {
                                        if(val.answerOption==8){
                                            localStorage.setItem('yesOption','selectedtrue');
                                        }
                                        //adding all the SurveyResponseAnswers into a assessment service
                                        this.assessmentService.addSurveyResponseAnswer(val);

                                        //adding all the answeroptions into a assessment service
                                        this.assessmentService.addAnsArr(val.answerOption);
                                    }                                                                                  //console.log("Answers",this.assessmentService.getSurveyResponseAnswer());  
                                    //console.log(appdata);                            
                                },err => {
                                    console.log(err);
                                })
                            }
                        }                     
                    },err => {
                        //if entry doesnot exist for survey id 1 and for selected appId 
                        if(err.status == 404) //not found
                        {                        
                            //alert("not found");                         
                            console.log(this.cid+" "+this.uid+" "+this.projectId+" "+this.applicationId);

                            //saving the survey in the backend server                      
                            this.applicationId=+appId;
                            if(this.applicationId!=0)
                            {            
                                const req = this.http.post<ISurveyResponseBean>(config.url+'surveyResponse/',
                                {
                                    "appId": this.applicationId,
                                    "companyId": this.cid,
                                    "projectId": this.projectId,
                                    "userId": this.uid,
                                    "surveyId": 1,                                
                                    "status": 'ACTIVE'
                                })
                                .subscribe(
                                    res => {
                                        console.log(res);                                    
                                        this.surveyResponseId=res.surveyResponse.surveyResponseId;     
                                        //console.log(this.surveyResponseId);
                                        localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
                                    },
                                    err => {
                                        console.log(err);
                                    }
                                );
                            }   
                            else {
                                alert("Please select an application");                        
                            } 
                        }
                    }
                )
        }
    }

    onAssessmentSubmitted(){
        
        this.showLoad=true;
        //localStorage.setItem('appId',this.applicationId);
        this.status=true;
        console.log("On Submit app Id is "+localStorage.getItem('appId'));
        /*alert("appId"+this.applicationId);
        alert("projectId"+this.projectId);
        alert("surveyResponseId"+this.surveyResponseId);*/

        //Checking if the status is already SUBMITTED       
        this.http.get<ISurveyResponseBean>(config.url+'surveyResponse/'+this.surveyResponseId)
        .subscribe(res => {                                  
            if(!(res.surveyResponse.status === 'SUBMITTED'))            
            {
                //making an entry for the assessment table for the current appId,projectId and surveyResponseId
                //and creating new assessment and assessment details for that particular application id
                this.http.patch<ISurveyResponseBean>(config.url+'surveyResponse/'+this.surveyResponseId+'/NOTSUBMITTED',
                {            
                    "status": "SUBMITTED"
                })
                .subscribe(
                    res => {
                        console.log(res);                                    
                        let status=res.surveyResponse.status;  
                        console.log("Status "+status);
                        //setInterval(() => this.checkStatusOfCurrentSurveyResponse(), 2*1000);                    
                        //setTimeout(this.router.navigate(['/advisory']),100000);
                        setTimeout(()=>{this.router.navigate(['/advisory'])},2*1000);
                        
                        //console.log(this.surveyResponseId);                
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
            else
            {
                //alert("Survey is already submitted");                                                                                                
                console.log("Survey is already submitted");
                 //making an entry for the assessment table for the current appId,projectId and surveyResponseId
                //and creating new assessment and assessment details for that particular application id
                this.http.patch<ISurveyResponseBean>(config.url+'surveyResponse/'+this.surveyResponseId+'/SUBMITTED',
                {            
                    "status": "SUBMITTED"
                })
                .subscribe(
                    res => {
                        console.log(res);                                    
                        let status=res.surveyResponse.status;  
                        console.log("Status "+status);
                        //setInterval(() => this.checkStatusOfCurrentSurveyResponse(), 2*1000);                    
                        //setTimeout(this.router.navigate(['/advisory']),100000);
                        setTimeout(()=>{this.router.navigate(['/advisory'])},2*1000);
                        //console.log(this.surveyResponseId);                
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        },err => {
            console.log(err);
        })
        
    }

    checkStatusOfCurrentSurveyResponse(){    
        console.log("hi");
        /*this.http.get(config.url+'surveyResponse/'+this.surveyResponseId)
        .subscribe(appdata => {   
             if(res.surveyResponse.status === 'SUBMITTED')            
            {
                this.status=false;
            }
                                       
        },err => {
            console.log(err);
        })*/
    }

    getCategory(){
        return this.assessmentService.getAllCategories();
    }

    saveNewApp(newAppName){
    //alert(e.target.value);
    
    //save new application in applications table
    this.http.post<IApplicationBean>(config.url+'application/',
    {        
        "appName": newAppName,
        "description": newAppName,
        "projectId": this.projectId
    })
    .subscribe(
        res => {
            console.log(res);
            let newAppId=res.application.appId;
            console.log(newAppId);
            //saving the survey in the backend server                                        
            this.http.post<ISurveyResponseBean>(config.url+'surveyResponse/',
            {
                "appId": newAppId,
                "companyId": this.cid,
                "projectId": this.projectId,
                "userId": this.uid,
                "surveyId": 1,                                
                "status": 'ACTIVE'
            })
            .subscribe(
                res => {
                    console.log(res);                                    
                    this.surveyResponseId=res.surveyResponse.surveyResponseId;     
                    //console.log(this.surveyResponseId);
                    localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
                    localStorage.setItem('appId',newAppId.toString());
                    console.log("Save new Application id is"+localStorage.getItem('appId'));
                },
                err => {
                    console.log(err);
                }
            );
        },
        err => {
            console.log(err);
        }
    );  
    }
}
