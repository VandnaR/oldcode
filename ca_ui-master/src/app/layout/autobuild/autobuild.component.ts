import { IPMDBean } from './../../entities/PMDBean';
import { IJenkinsBuildStatus } from './../../entities/JenkinsBuildStatus';
import { IContainerProject } from './../../entities/ContainerRepository';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { Observable } from 'rxjs';

import { config } from '../../../assets/config/configuration';

@Component({
    selector: 'app-autobuild',
    templateUrl: './autobuild.component.html',
    styleUrls: ['./autobuild.component.scss'],
    animations: [routerTransition()]
})
export class AutoBuildComponent implements OnInit {
      
    constructor(private http:HttpClient,public router: Router) {}
    showLoad=false;
    completed=false;
    load=false;
    username = localStorage.getItem('username');
    projects : IProject[];
    containerRepo : IContainerProject[];
    jenkinsBuildStatus :  IJenkinsBuildStatus;
    applications : IApplication[];
    cid =localStorage.getItem('companyId');
    appId=localStorage.getItem("appId");
    
    projectId;
    jenkinsStatus;
    toggleClass;
    clairFileLink:string;

    vm2dockerMsg:string;
    vm2dockerStatus:boolean=false;
    // companyId:number;
    // companyName:string;
 

    ngOnInit() {     
        this.http.get<IProject[]>(config.serverUrl+'company/'+this.cid+'/projects')
            .subscribe(projectdata => {                
                this.projects=projectdata;
                console.log(this.projects);                                         
            }) 
        
    }
    getApps(projectId: number)
    {        
        
        //getting application for the selected project      
        if(+projectId!=0)
        {
            this.http.get<IApplication[]>(config.serverUrl+'project/'+projectId+'/applications')
            .subscribe(appdata => {                
                this.applications=appdata;
                this.projectId=+projectId;
                console.log(this.applications);                                        
            })
        }   
        else {
            alert("Please select a project");                        
        }       

        this.http.get<IContainerProject[]>(config.serverUrl+'imageRepository/getByProjectId/'+projectId)
        .subscribe(res => {                
            this.containerRepo=res;
            console.log("3974628374698746934");                        
            console.log(this.containerRepo);                        
            
        } ) 
    }
    
    jenkinsBuild(codeRepoPath,appName,builtImageRepo,appServer,codeRepo,language,codeType,repoType,buildType,appTag)
    {
        //alert(language.value);
        this.showLoad=true;
        // alert(codeRepoPath.value);
        // alert(appName.value);
        // alert(builtImageRepo.value);
            
        
        //code for maven and war
        
        function getRadioVal(form, name) {
        var val;
        // get list of radio buttons with specified name
        var radios = form.elements[name];
        
        // loop through list of radio buttons
        for (var i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                val = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }
        return val; // return value of checked radio or undefined if none checked
    }
     
    var val = getRadioVal( document.getElementById('testform'), 'codeType' );
    codeType.value=val;
   
      console.log(val);
      console.log(codeType.value);

  
        if(language.value=="C++"){
            console.log(language.value);

        }
        else if(language.value=="PHP"){
            this.http.post(config.serverUrl+'autoBuild/jenkinsPHP',
            {                       
                // "companyId": this.cid,
                // "projectId": this.projectId,
                "repositoryUrl": codeRepoPath.value,
                "appName": appName.value.toLowerCase() ,
                "reponame": builtImageRepo.value
            })
            .subscribe(
                res => {
                    console.log("*******************Auto Build Jenkins PHP *********************************");  
                    
                    this.http.post(config.url+'saveBuild',
            {                       
                "companyId": this.cid,
                "projectId": this.projectId,
                //"appId": 5,
                "appId": this.appId,
                "appServer": appServer.value,
                "codeRepo": codeRepo.value,
                "codeRepoPath": codeRepoPath.value,
                "codeType": codeType.value,
                "repoType": repoType.value,
                "buildType": buildType.value,
                "imageRepo": builtImageRepo.value
                

            })
            .subscribe(
                res => {
                    console.log("******************* Save Jenkins Build Details *********************************");                 

                    this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsPHPBuildStatus',{

                    })
                    .subscribe(
                        res => {
                            console.log("******************* Jenkins Build Status *********************************");                 
                                
                                this.jenkinsStatus= res.status;
                                if(this.jenkinsStatus ==="SUCCESS"){
                                    this.jenkinsStatus="Successfull!";
                                    this.toggleClass=true;
                                }
                                else{
                                    this.jenkinsStatus="Failure!";
                                    this.toggleClass=false;
                                }
                                this.showLoad=false;
                                this.completed=true;
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
                        
                    

                },
                err => {
                console.log(err);
                }
            );
        }
        else if(language.value=".NET"){
            console.log(language.value);
        }

        if(appServer.value!="0" && appServer.value == "Websphere Application Server 8.5")
        {

            this.http.post(config.serverUrl+'autoBuild/jenkinsWas',
            {                       
                // "companyId": this.cid,
                // "projectId": this.projectId,
                "repositoryUrl": codeRepoPath.value,
                "appName": appName.value.toLowerCase() ,
                "reponame": builtImageRepo.value
            })
            .subscribe(
                res => {
                    console.log("*******************Auto Build Jenkins*********************************");  
                    
                    this.http.post(config.url+'saveBuild',
            {                       
                "companyId": this.cid,
                "projectId": this.projectId,
                //"appId": 5,
                "appId": this.appId,
                "appServer": appServer.value,
                "codeRepo": codeRepo.value,
                "codeRepoPath": codeRepoPath.value,
                "codeType": codeType.value,
                "repoType": repoType.value,
                "buildType": buildType.value,
                "imageRepo": builtImageRepo.value

            })
            .subscribe(
                res => {
                    console.log("******************* Save Jenkins Build Details*********************************");                 

                    this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsWasBuildStatus',{

                    })
                    .subscribe(
                        res => {
                            console.log("******************* Jenkins Build Status *********************************");                 
                                
                                this.jenkinsStatus= res.status;
                                if(this.jenkinsStatus ==="SUCCESS"){
                                    this.jenkinsStatus="Successfull!";
                                    this.toggleClass=true;
                                }
                                else{
                                    this.jenkinsStatus="Failure!";
                                    this.toggleClass=false;
                                }
                                this.showLoad=false;
                                this.completed=true;
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
                        
                    

                },
                err => {
                console.log(err);
                }
            );

        }
        else if(appServer.value!="0" && appServer.value == "Web Logic")
        {

            this.http.post(config.serverUrl+'autoBuild/jenkinsWebLogic',
            {                       
                // "companyId": this.cid,
                // "projectId": this.projectId,
                "repositoryUrl": codeRepoPath.value,
                "appName": appName.value.toLowerCase() ,
                "reponame": builtImageRepo.value
            })
            .subscribe(
                res => {
                    console.log("*******************Auto Build Jenkins WebLogic *********************************");  
                    
                    this.http.post(config.url+'saveBuild',
            {                       
                "companyId": this.cid,
                "projectId": this.projectId,
                //"appId": 5,
                "appId": this.appId,
                "appServer": appServer.value,
                "codeRepo": codeRepo.value,
                "codeRepoPath": codeRepoPath.value,
                "codeType": codeType.value,
                "repoType": repoType.value,
                "buildType": buildType.value,
                "imageRepo": builtImageRepo.value

            })
            .subscribe(
                res => {
                    console.log("******************* Save Jenkins Build Details *********************************");                 

                    this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsWebLogicBuildStatus',{

                    })
                    .subscribe(
                        res => {
                            console.log("******************* Jenkins Build Status *********************************");                 
                                
                                this.jenkinsStatus= res.status;
                                if(this.jenkinsStatus ==="SUCCESS"){
                                    this.jenkinsStatus="Successfull!";
                                    this.toggleClass=true;
                                }
                                else{
                                    this.jenkinsStatus="Failure!";
                                    this.toggleClass=false;
                                }
                                this.showLoad=false;
                                this.completed=true;
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
                        
                    

                },
                err => {
                console.log(err);
                }
            );

        }
        
  //code for maven and war
        else if(appServer.value!="0" && appServer.value =="Tomcat")
        {
            if(codeType.value=="war"){
                console.log("inside war creation");
                this.http.post(config.serverUrl+'autoBuild/jenkins',
                {                       
                    // "companyId": this.cid,
                    // "projectId": this.projectId,
                    "repositoryUrl": codeRepoPath.value,
                    "appName": appName.value.toLowerCase() ,
                    "reponame": builtImageRepo.value,
                    "appTag": appTag.value
                })
                .subscribe(
                    res => {
                        console.log("*******************Auto Build Jenkins*********************************");  
                        
                        this.http.post(config.url+'saveBuild',
                {                       
                    "companyId": this.cid,
                    "projectId": this.projectId,
                    //"appId": 5,
                    "appId": this.appId,
                    "appServer": appServer.value,
                    "codeRepo": codeRepo.value,
                    "codeRepoPath": codeRepoPath.value,
                    "codeType": codeType.value,
                    "repoType": repoType.value,
                    "buildType": buildType.value,
                    "imageRepo": builtImageRepo.value,
                    "appTag": appTag.value
    
                })
                .subscribe(
                    res => {
                        console.log("******************* Save Jenkins Build Details*********************************");                 
    
                        this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsBuildStatus',{
    
                        })
                        .subscribe(
                            res => {
                                console.log("******************* Jenkins Build Status *********************************");                 
                                    
                                    this.jenkinsStatus= res.status;
                                    if(this.jenkinsStatus ==="SUCCESS"){
                                        this.jenkinsStatus="Successfull!";
                                        this.toggleClass=true;
    
                                        localStorage.setItem('appName',appName.value.toLowerCase())
                                        this.http.post<IPMDBean>(config.serverUrl+'clairAnalyze/'+appName.value.toLowerCase(),{} )
                                        .subscribe(res => {    
                                            
                                            //set the clair Flag
                                            localStorage.setItem('clairFlag','0');
                                            
                                            this.clairFileLink=res.filePath;
                                            console.log("Clair analyze completed!");   
                                            //this.router.navigate(['./blank-page']);                                    
                                        })
                                                                            
                                    }
                                    else{
                                        this.jenkinsStatus="Failure!";
                                        this.toggleClass=false;
                                    }
                                    this.showLoad=false;
                                    this.completed=true;
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
                            
                        
    
                    },
                    err => {
                    console.log(err);
                    }
                );
            }else{
                      console.log("inside maven creation");                
                // for maven codetype
                this.http.post(config.serverUrl+'autoBuild/mavenjenkins',
                {                       
                    // "companyId": this.cid,
                    // "projectId": this.projectId,
                    "repositoryUrl": codeRepoPath.value,
                    "appName": appName.value.toLowerCase() ,
                    "reponame": builtImageRepo.value,
                    "appTag": appTag.value
                })
                .subscribe(
                    res => {
                        console.log("*******************Auto Build Maven Jenkins*********************************");  
                        
                        this.http.post(config.url+'saveBuild',
                {                       
                    "companyId": this.cid,
                    "projectId": this.projectId,
                    //"appId": 5,
                    "appId": this.appId,
                    "appServer": appServer.value,
                    "codeRepo": codeRepo.value,
                    "codeRepoPath": codeRepoPath.value,
                    "codeType": codeType.value,
                    "repoType": repoType.value,
                    "buildType": buildType.value,
                    "imageRepo": builtImageRepo.value,
                    "appTag": appTag.value
    
                })
                .subscribe(
                    res => {
                        console.log("******************* Save Jenkins Maven Build Details*********************************");                 
    
                        this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsMavenBuildStatus',{
    
                        })
                        .subscribe(
                            res => {
                                console.log("******************* Jenkins Build Status *********************************");                 
                                    
                                    this.jenkinsStatus= res.status;
                                    if(this.jenkinsStatus ==="SUCCESS"){
                                        this.jenkinsStatus="Successfull!";
                                        this.toggleClass=true;
    
                                        localStorage.setItem('appName',appName.value.toLowerCase())
                                        this.http.post<IPMDBean>(config.serverUrl+'clairAnalyze/'+appName.value.toLowerCase(),{} )
                                        .subscribe(res => {    
                                            
                                            //set the clair Flag
                                            localStorage.setItem('clairFlag','0');
                                            
                                            this.clairFileLink=res.filePath;
                                            console.log("Clair analyze completed!");   
                                            //this.router.navigate(['./blank-page']);                                    
                                        })
                                                                            
                                    }
                                    else{
                                        this.jenkinsStatus="Failure!";
                                        this.toggleClass=false;
                                    }
                                    this.showLoad=false;
                                    this.completed=true;
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
                            
                        
    
                    },
                    err => {
                    console.log(err);
                    }
                );


            }
            
        }
     
    

        // setTimeout(() => {            
        //     this.showLoad=false;
        //     this.completed=true;
        // }, 2000)
    }



       
  /*     else if(appServer.value!="0" && appServer.value =="Tomcat")
        {
            this.http.post(config.serverUrl+'autoBuild/jenkins',
            {                       
                // "companyId": this.cid,
                // "projectId": this.projectId,
                "repositoryUrl": codeRepoPath.value,
                "appName": appName.value.toLowerCase() ,
                "reponame": builtImageRepo.value,
                  "appTag": appTag.value
            })
            .subscribe(
                res => {
                    console.log("*******************Auto Build Jenkins*********************************");  
                    
                    this.http.post(config.url+'saveBuild',
            {                       
                "companyId": this.cid,
                "projectId": this.projectId,
                //"appId": 5,
                "appId": this.appId,
                "appServer": appServer.value,
                "codeRepo": codeRepo.value,
                "codeRepoPath": codeRepoPath.value,
                "codeType": codeType.value,
                "repoType": repoType.value, 
                "buildType": buildType.value,
                "imageRepo": builtImageRepo.value,
                "appTag": appTag.value

            })
            .subscribe(
                res => {
                    console.log("******************* Save Jenkins Build Details*********************************");                 

                    this.http.post<IJenkinsBuildStatus>(config.url+'autoBuild/jenkinsBuildStatus',{

                    })
                    .subscribe(
                        res => {
                            console.log("******************* Jenkins Build Status *********************************");                 
                                
                                this.jenkinsStatus= res.status;
                                if(this.jenkinsStatus ==="SUCCESS"){
                                    this.jenkinsStatus="Successfull!";
                                    this.toggleClass=true;

                                    localStorage.setItem('appName',appName.value.toLowerCase())
                                    this.http.post<IPMDBean>(config.serverUrl+'clairAnalyze/'+appName.value.toLowerCase(),{} )
                                    .subscribe(res => {    
                                        
                                        //set the clair Flag
                                        localStorage.setItem('clairFlag','0');
                                        
                                        this.clairFileLink=res.filePath;
                                        console.log("Clair analyze completed!");   
                                        //this.router.navigate(['./blank-page']);                                    
                                    })
                                                                        
                                }
                                else{
                                    this.jenkinsStatus="Failure!";
                                    this.toggleClass=false;
                                }
                                this.showLoad=false;
                                this.completed=true;
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
                        
                    

                },
                err => {
                console.log(err);
                }
            );
        }

        

        

        

        // setTimeout(() => {            
        //     this.showLoad=false;
        //     this.completed=true;
        // }, 2000)
    }
*/

    buildImage(projectNameVM,appNameVM,builtImageRepoVM,s3pathVM){

        console.log("in vm2docker function");
        
        this.vm2dockerStatus=true;        
        this.vm2dockerMsg="Copying VM File";

        setTimeout(()=>{
            this.vm2dockerMsg="Scanning and Extracting Apps from VM File";
            setTimeout(()=>{
                this.vm2dockerMsg="Building Docker Image";
                setTimeout(()=>{
                    this.vm2dockerMsg="Pushing Docker Image into registry";
                    setTimeout(()=>{
                        this.vm2dockerMsg="Vm2Docker completed successfully";
                        this.vm2dockerStatus=false;
                    },3000);
                },3000);
            },3000);             
        },3000); 

        console.log("vm2DockerParams are "+s3pathVM.value+" "+appNameVM.value+" "+builtImageRepoVM.value);
        this.http.post(config.fileUploadUrl+'vm2docker',
        {    
            //body     
            "s3Path": s3pathVM.value,
            "appName":appNameVM.value.toLowerCase(),            
            "repoName":builtImageRepoVM.value   
        })
        .subscribe(
            res=>{
                console.log(res);
            }
        );
        

    }
    
}
