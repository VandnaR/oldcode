import { mergeMap } from 'rxjs/operators';
import { IMigrationAnalysisBean } from './../../entities/MigrationAnalysisBean';
import { PortfolioDetails } from './../../shared/services/PortfolioDetails';
import { config } from './../../../assets/config/configuration';

import { IFileUploadVersion } from './../../entities/FileUploadVersion';
import { IFileUploadVersions } from './../../entities/FIleUploadVersions';
import { IFileUploadProfile } from './../../entities/FileUploadProfile';
import { IMigrationProvider } from './../../entities/MigrationProvider';
//angular imports
import { Component, OnInit, Input} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//custom imports
import { IProject } from '../../entities/Project';
import { IQuestion } from '../../entities/Question';
import { IFileUpload } from '../../entities/FileUpload';
import { ICategory } from '../../entities/Category';
import { IApplication } from '../../entities/Application';
import { IApplicationBean } from '../../entities/ApplicationBean';
//import { IAnswerOption } from '../../entities/AnswerOption';
import { IPMDBean} from '../../entities/PMDBean'; 
import { ITwelveFactorReport } from '../../entities/TwelveFactorReport';
import { AssessmentService } from '../assessment/assessment.service';

@Component({
    selector: 'app-amt',
    templateUrl: './amt.component.html',
    styleUrls: ['./amt.component.scss'],
    animations: [routerTransition()]
})
export class AMTComponent implements OnInit {

    amtForm;
    cid;
    projects : IProject[];
    applications : IApplication[];
    migrationProviders:IMigrationProvider[];
    file:File;
    amtMigrationTools = [];
    selectedProjectName;
    selectedProjectId;
    selectedAppId;
    selectedAppName;
    versionCount;

    fileUploadprofileId;
    fileUploadVesrionsId;
    subFolder;
    uploadUrl;
    reportUrl;
    uploadedFileName;
    showLoad;
    showLoad_PMD;
    showReport;
    showAMTError;
    message;

    appId=+localStorage.getItem('appId');
    pmdFileLink;
    showCompleted=false;
    twelveFactorReport: ITwelveFactorReport[];

    constructor(private http: HttpClient,private portfolioDetails:PortfolioDetails, private assessmentService: AssessmentService) { }

    ngOnInit() {

        this.amtForm = new FormGroup({
            'project': new FormControl('Select a portfolio', Validators.required),
            'application': new FormControl('Select an application', Validators.required),
            'migrationToolkitId': new FormControl('Select migration provider', Validators.required),
            'uploadLocation': new FormControl('Select upload location', Validators.required),
            'uploadFile': new FormControl(null,Validators.required),
        });                  

        this.showCompleted=false;
        this.cid=+localStorage.getItem('companyId');
        console.log(this.cid);
        
        this.http.get<IProject[]>(config.url+'company/'+this.cid+'/projects')
        .subscribe(projectdata => {                
            this.projects=projectdata;
            console.log(this.projects);                                                     
            this.http.get<IMigrationProvider[]>(config.url+'migrationToolkitProviders')
            .subscribe(res => {                
                this.migrationProviders=res;
                console.log(this.migrationProviders); 
                                                                        
            },
            err=>{
                console.log("No providers found");
            });
        },
        err=>{
            console.log("No projects for the current company Id");
        });
    }

    getApps(projectDetails: string)
    {       
        console.log(projectDetails);
        let arr=projectDetails.split("&");
        this.selectedProjectId=arr[0];
        this.selectedProjectName=arr[1];        
        if(+this.selectedProjectId!=0)
        {
            this.http.get<IApplication[]>(config.url+'project/'+this.selectedProjectId+'/applications')
            .subscribe(appdata => {             
                this.applications=appdata;
                //console.log(this.applications);                                        
            },err => {
                    console.log("No application for this project");
                    console.log(err);
            })
        }   
        else {
            alert("Please select a project");                        
        }
    }

    onFileUpload(event){       
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
             let file: File = fileList[0];
             this.file=file;
        }
    }

    onSubmit()
    {         
        this.showLoad=true;
        this.message="Uploading file";
        let projectDetails=this.amtForm.value.project;
        //get project id and name
        let splitArrProject=projectDetails.split("&");
        this.selectedProjectId=splitArrProject[0];
        this.selectedProjectName=splitArrProject[1];

        let appDetails=this.amtForm.value.application;
        //get app id and name
        let splitArrApp=appDetails.split("&");
        this.selectedAppId=splitArrApp[0];
        this.selectedAppName=splitArrApp[1];


        console.log(this.selectedProjectName+" "+this.selectedProjectId);
        console.log(this.amtForm.value);

        let fileUploadProfileBody= {
            projectId: this.selectedProjectId,
            appId : this.selectedAppId,
            mtpId : this.amtForm.value.migrationToolkitId,        
       }
       console.log(fileUploadProfileBody);
       //config.serverUrl+'fileUploadProfile
       this.http.post<IFileUploadProfile>(config.url+'fileUploadProfile',fileUploadProfileBody)
       .subscribe( 
           (data) =>{
            console.log("fileUpload File saved");
               console.log(data);
               this.fileUploadprofileId= data.fileUploadProfile.fileUploadProfileId;         
               this.http.get<IFileUploadVersions[]>(config.url+'fileUploadVersion/fileUploadProfileId/'+data.fileUploadProfile.fileUploadProfileId)
                .subscribe( res =>{                    
                    console.log("size is");
                    console.log(res.length);
                   this.versionCount=res.length+1;
                   this.http.post<IFileUploadVersion>(config.url+'fileUploadVersion/',
                   {
                        fileUploadProfileId : this.fileUploadprofileId,
                        version : 'v'+this.versionCount
                   }).subscribe(
                        res =>{
                                    console.log(res);                                     
                                    this.fileUploadVesrionsId=res.fileUploadVersion.fileUploadVersionsId;
                                                                        
                                    this.subFolder=this.selectedProjectName+"/"+this.selectedAppName+"/migration_analysis/"+this.versionCount;
                                    console.log("SubFolder is "+this.subFolder);
                                    //upload File to AWS
                                    console.log("Uploading file to upload location context provided");
                                    //localStorage.setItem('amtflag','amtFlag');
                                    //console.log("AmtFlag is "+localStorage.getItem('amtflag'));
                                    this.portfolioDetails.amtFlag=true;
                                    let formData:FormData = new FormData();
                                    let contextModelData={
                                        clientAppId: config.clientAppId,
                                        clientAppSecret:config.clientAppSecret,
                                        subFolderPath: this.subFolder,
                                        contextClientId:1,
                                        entityContextId:1,
                                        uploadLocationContextId:1
                                    };
                                    let contextModelValue= JSON.stringify(contextModelData);

                                    formData.append('file', this.file);
                                    formData.append('contextModel',contextModelValue);                                                                                                            
                                    // this.http.post('http://ec2-35-175-68-194.compute-1.amazonaws.com:8091/uploadFile', formData,{ headers })
                                    this.http.post<IFileUpload>(config.fileUploadUrl+'uploadFile', formData)
                                    .subscribe(res =>{                                      
                                            console.log(res);
                                            //this.showLoad=false;    
                                            if(!res.fileUpload){
                                                this.showLoad=false;   
                                                this.showAMTError=true; 
                                                return;
                                            }
                                            console.log("File uploaded successfully");
                                            this.uploadedFileName=res.fileUpload.fileName;
                                            this.uploadUrl=res.fileUpload.fileUploadUrl;
                                            let fileUploadId=res.fileUpload.fileUploadId;
                                            //update the upload_service_id
                                            this.http.patch<IFileUploadProfile>(config.url+'fileUploadProfile/'+this.fileUploadprofileId+'/'+fileUploadId,{})                                            
                                            .subscribe(res =>{                                      
                                                    console.log(res); 
                                                    this.message="Migration analysis is in progress";
                                                    //migration analysis code goes here(script one)
                                                    //run script of amt as file is uploaded successfully
                                                    this.http.post<IMigrationAnalysisBean>(config.fileUploadUrl+'migrationAnalysis',{
                                                        uploadLocationContextId:1,
                                                        subFolder: this.subFolder,
                                                        fileName : this.uploadedFileName
                                                    })
                                                    .subscribe(res => {  
                                                        this.showLoad=false;
                                                        this.message="";                                                         
                                                        this.reportUrl=res.reportUrl;
                                                        console.log(res);  
                                                        this.showReport=true;
                                                        //upload the uploadurl and report url
                                                        this.http.patch(config.url+'fileUploadVersion/'+this.fileUploadVesrionsId,{
                                                            reportUrl: this.reportUrl,
                                                            uploadUrl: this.uploadUrl
                                                        })
                                                        .subscribe(res =>{                                      
                                                                console.log(res);        
                                                                                                
                                                            },error => {
                                                                console.log(error);                   
                                                            });                                                                                                              
                                                    },
                                                    err=>{
                                                        console.log(err);
                                                        this.showLoad=false;
                                                        this.showAMTError=true;
                                                    });                                                    
        
                                                },error => {
                                                    console.log(error);   
                                                    this.showLoad=false;   
                                                    this.showAMTError=true;             
                                                });

                                        },error => {
                                            console.log(error);     
                                            this.showLoad=false;      
                                            this.showAMTError=true;       
                                        }); 
                                }
                    );
                }

                );
               }
            );        
    }

    onPMDAnalyze(gitURL,typeOfReport){        

        this.showLoad_PMD=true;
        console.log("PMD app Id"+this.appId);
        console.log("PMD gitURL Id"+gitURL);
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
                this.showLoad_PMD=false;
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
                    this.assessmentService.setTwelveFactorReport(this.twelveFactorReport);                                  
                })
            },
            err => {
              console.log(err);    
              this.showLoad_PMD=false;   
            }
        );
    }
    }
