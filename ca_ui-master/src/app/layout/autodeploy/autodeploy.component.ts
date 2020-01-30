import { IOCPProjects } from './../../entities/OCPProjects';

import { IGetImages } from './../../entities/GetImages';
import { IContainerProject } from './../../entities/ContainerRepository';
import { IGetGCPDeployedApps } from './../../entities/GetGCPDeployedApps';
import { IAutoDeployProject } from './../../entities/AutoDeploy';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { Observable } from 'rxjs';
import { config } from '../../../assets/config/configuration';
import { IGetClusters } from '../../entities/GetClusters';

@Component({
    selector: 'app-autodeploy',
    templateUrl: './autodeploy.component.html',
    styleUrls: ['./autodeploy.component.scss'],
    animations: [routerTransition()]
})
export class AutoDeployComponent implements OnInit {
      
    constructor(private http:HttpClient,private router: Router) {
        
    }

    cluster:any; 
    
    showLoad=false;
    completed=false;
    file: File;
    name;
    public selectionModel;
    showOcProjects:boolean=false;
    oCPProjects:IOCPProjects[];

    title = '';
    username = localStorage.getItem('username');
    projects : IProject[];
    applications : IApplication[];
    GCPApps : IGetGCPDeployedApps[];
    containerRepo : IContainerProject[];
    images : IGetImages[];
    clusters : IGetClusters[];
    projectId;
    cid =localStorage.getItem('companyId');
    appId=localStorage.getItem("appId");
         

    ngOnInit() {      
        this.http.get<IProject[]>(config.serverUrl+'company/'+this.cid+'/projects')
        .subscribe(projectdata => {                
            this.projects=projectdata;
            console.log(this.projects);                                         
        }) 
    }

    fileChange(event: any) {
        // Instantiate an object to read the file content
        let reader = new FileReader();
        // when the load event is fired and the file not empty
        if(event.target.files && event.target.files.length > 0) {
          // Fill file variable with the file content
          this.file = event.target.files[0];
        }
      }

    yamlDeploy(ddlprojects,selectedAppName,selectedProvider,selectedCluster,file)
    {
        this.showLoad=true;
        this.http.post<IAutoDeployProject>(config.serverUrl+'saveDeploy',
        {                       
            "companyId": this.cid,
            "projectId": ddlprojects.value,
            //"appId": "5",
            "appId": this.appId,
            "envName": selectedProvider.value,
            "clusterName": selectedCluster.value
            
        })
        .subscribe(
            res => {
                // console.log("+++++++ Inside ++++++");
                console.log(res);
                 console.log(res.autoDeploy.deployId);
                let body = new FormData();
                body.append("file", this.file); 
                
                this.http.post<IAutoDeployProject>(config.serverUrl+'autoDeploy/'+res.autoDeploy.deployId+'/uploadfile',body)
                .subscribe(
                    res => {
                        console.log("*******************UPLOAD *********************************"); 
                        console.log(res);
                        // this.surveyResponseId=res.surveyResponse.surveyResponseId;       
                        //localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());

                        this.http.post<IAutoDeployProject>(config.serverUrl+'autoDeploy/'+res.autoDeploy.deployId+'/deployYaml',
                        {
                            "yamlPath": res.autoDeploy.yamlPath,
                            "clusterName": res.autoDeploy.clusterName
                        })
                        .subscribe( 
                            res => {
                                console.log("*******************UPLOAD *********************************"); 
                                console.log(res);
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

        setTimeout(() => {            
            this.showLoad=false;
            //this.completed=true;
            this.router.navigate(['/deployedapps']);

        }, 2000)
    }

    deploy(ddlprojects,selectedAppName,selectedProvider,selectedCluster,selectedOCPProject,selectedRepo,selectedImage,port)
    { 
        this.showLoad=true;
        //alert(selectedAppName.value+" "+ selectedCluster.value+ " " + selectedImage.value);        
        console.log("selectedOCPProject is "+selectedOCPProject.value);

        if(selectedProvider.value === 'AWS'){

        this.http.post(config.serverUrl+'autoDeploy/EKS',
        {                                   
            "imageName": selectedImage.value,
            "appName": selectedAppName.value.toLowerCase(),
            "clusterName": selectedCluster.value,
            "port": port.value
        })
        .subscribe(
            res => {
                console.log("******************* Deploying on EKS *********************************");                 
                
                    this.http.post(config.serverUrl+'saveDeploy',
                    {                       
                        "companyId": this.cid,
                        "projectId": ddlprojects.value,
                        //"appId": "5",
                        "appId": this.appId,
                        "envName": selectedProvider.value,
                        "clusterName": selectedCluster.value,
                        "repoName": selectedRepo.value,
                        "imageName": selectedImage.value
                        
                    })
                    .subscribe(
                            res => {
                                console.log("******************* Saving deployment details *********************************");        
                            
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
        else if(selectedProvider.value === 'Google Cloud'){
            this.http.post(config.serverUrl+'autoDeploy/GCP',
        {                       
            // "companyId": this.cid,
            // "projectId": this.projectId,
            "imageName": selectedImage.value,
            "appName": selectedAppName.value.toLowerCase(),
            "clusterName": selectedCluster.value,
            "port": port.value
        })
        .subscribe(
            res => {
                console.log("******************* Deploying on GCP *********************************");                 
                
                    this.http.post(config.serverUrl+'saveDeploy',
                    {                       
                        "companyId": this.cid,
                        "projectId": ddlprojects.value,
                        //"appId": "5",
                        "appId": this.appId,
                        "envName": selectedProvider.value,
                        "clusterName": selectedCluster.value,
                        "repoName": selectedRepo.value,
                        "imageName": selectedImage.value
                        
                    })
                    .subscribe(
                            res => {
                                console.log("******************* Saving deployment details *********************************");        
                            
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
        else if(selectedProvider.value === 'Openshift'){
            this.http.post(config.serverUrl+'autoDeploy/OC',
            {                                   
            "imageName": selectedImage.value,
            "appName": selectedAppName.value.toLowerCase(),
            "projectName": selectedOCPProject.value
            // "port": port.value
            })
        .subscribe(
            res => {
                console.log("******************* Deploying on OCP *********************************");                 
                
                    this.http.post(config.serverUrl+'saveDeploy',
                    {                       
                        "companyId": this.cid,
                        "projectId": ddlprojects.value,
                        //"appId": "5",
                        "appId": this.appId,
                        "envName": selectedProvider.value,
                        "clusterName": selectedOCPProject.value,
                        "repoName": selectedRepo.value,
                        "imageName": selectedImage.value
                        
                    })
                    .subscribe(
                            res => {
                                console.log("******************* Saving deployment details *********************************");        
                            
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
        else if(selectedProvider.value === 'Azure'){
            this.http.post(config.serverUrl+'autoDeploy/Azure',
            {                                   
                "imageName": selectedImage.value,
                "appName": selectedAppName.value.toLowerCase(),
                "clusterName": selectedCluster.value,
                "port": port.value
            })
        .subscribe(
            res => {
                console.log("******************* Deploying on Azure *********************************");                 
                
                    this.http.post(config.serverUrl+'saveDeploy',
                    {                       
                        "companyId": this.cid,
                        "projectId": ddlprojects.value,
                        //"appId": "5",
                        "appId": this.appId,
                        "envName": selectedProvider.value,
                        "clusterName": selectedCluster.value,
                        "repoName": selectedRepo.value,
                        "imageName": selectedImage.value
                        
                    })
                    .subscribe(
                            res => {
                                console.log("******************* Saving deployment details *********************************");        
                            
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

        setTimeout(() => {            
            this.showLoad=false;
            //this.completed=true;
            this.router.navigate(['/deployedapps']);

        }, 90000)
    }

  
        
    getClusters(envname:string)
    {
        this.showOcProjects=false;
        console.log(envname);
        if(envname=="Google Cloud")
        {                  
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getGCPClusters')
                .subscribe(projectdata => {
                this.clusters=projectdata;
                console.log(this.clusters);                                         
            });
        }
        else if(envname=="AWS")
        {           
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getAWSClusters')
            .subscribe(projectdata => {
            this.clusters=projectdata;
            console.log(this.clusters);                               
            });
        }
        else if(envname=="Azure")
        {            
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getAzureClusters')
            .subscribe(projectdata => {
            this.clusters=projectdata;
            console.log(this.clusters);                               
            });
        }
        else if(envname=="PCF")
        {
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getPCFClusters')
            .subscribe(projectdata => {
            this.clusters=projectdata; 
            console.log(this.clusters);                               
            }); 
        }
        else if(envname=="Openshift")
        {
            this.showOcProjects=true;
            this.http.get<IOCPProjects[]>(config.serverUrl+'autoDeploy/getOpenShiftProjects')
            .subscribe(res => {
            this.oCPProjects=res; 
            console.log(this.oCPProjects);                               
            }); 
        }            
    }

    showImageRepositoriesAndApps(projectId:number)
    {
       
        this.http.get<IContainerProject[]>(config.serverUrl+'imageRepository/getByProjectId/'+projectId)
        .subscribe(res => {                
            this.containerRepo=res;
            console.log("3974628374698746934");                        
            console.log(this.containerRepo);                        
            
        } ) 

        {
            this.http.get<IApplication[]>(config.serverUrl+'project/'+projectId+'/applications')
            .subscribe(appdata => {                
                this.applications=appdata;
                this.projectId=+projectId;
                //console.log(this.applications);                                        
            })
        }   
    }

    
    getImages(repoName:number)
    {
        
        this.http.post<IGetImages[]>(config.serverUrl+'autoDeploy/getImages',
        {                       
            "reponame": repoName
        })
        .subscribe(
            res => {
                
                console.log("*******************Getting Images *********************************");  
                
                this.images=res;
                                       
                console.log(this.images);         
               // this.surveyResponseId=res.surveyResponse.surveyResponseId;
              //localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
            },
            err => {
            console.log(err);
            }
        ); 
    } 
}

