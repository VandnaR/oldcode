import { PortfolioDetails } from './../../shared/services/PortfolioDetails';
import { IGrafana } from './../../entities/Grafana';
import { ICompany } from './../blank-page/Company';
import { IEnvironmentProject } from './../../entities/Environment';
import { IEnvironmentBean } from './../../entities/EnvironmentBean';
import { environment } from './../../../environments/environment.prod';
import { IContainerProject } from './../../entities/ContainerRepository';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { Observable } from 'rxjs';
import { config } from '../../../assets/config/configuration';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss'],
    animations: [routerTransition()]
})
export class ConfigurationComponent implements OnInit {
      
    constructor(private http:HttpClient, private portfolioDetails:PortfolioDetails) {}
    title = '';
    grafanaURL='';
    isGrafanaURL: boolean =false;
    username = localStorage.getItem('username');
    projects : IProject[];
    containerRepo : IContainerProject[]=[];
    environment : IEnvironmentProject[]=[]; 
    applications : IApplication[];
    cid =localStorage.getItem('companyId');

    public showUsername:boolean = false;
    public showJson:boolean =false;

    file: File;
    
    repoId;
    companyId = 5;
    projectId; 
    repoName;
    repoServer;
    username1;
    password; 
    clusterName;
	
	//cluster variables 
    cloudProviderObj;
    cloudProviderRenderObj;
	
    // companyId:number;
    // companyName:string;
 
   

    ngOnInit() {     
        // this.http.get<IContainerProject[]>('http://localhost:8090/imageRepository/9')
          
            
            // this.http.get<IEnvironmentProject[]>(config.serverUrl+'getAllEnvironment')
            // .subscribe(res => {                
            //     this.environment=res;
            //     console.log("3974628374698746934");                         
            //     console.log(this.environment);                        
            // } )   
			
			
			 // get cloud-provider json for cluster creation  
            this.http.get('./assets/json/cloud-provider.json')
            .subscribe(data => {
                    this.cloudProviderObj = data;
                    this.cloudProviderRenderObj = data[0];
                },
                err =>{
                    console.log(err);
                }
            );
			
            this.http.get<IProject[]>(config.serverUrl+'company/'+this.cid+'/projects')
            .subscribe(projectdata => {                
                this.projects=projectdata;
                console.log(this.projects);                                         
            }) 
            
        // this.http.get<IUser>('http://localhost:8090/user')
        //     .subscribe(userdata => {
        //         this.user=userdata;
        //         console.log(this.user);
        //       this.http.get<ICompany>('http://localhost:8090/company/'+userdata.user.companyId)
        //       .subscribe(companydata =>{
        //           this.company=companydata;
        //         console.log(this.company);
        //       })            
        //     })
    }
    
    getProvider(providerName:string)
    {
        
        if(providerName=='Google Cloud')
        {
            this.showUsername = false;
            this.showJson = true;
        }
        else{
            this.showUsername= true;
            this.showJson = false;
        }
        
    }

    showImageRepositories(projectId:number)
    {
        this.http.get<IContainerProject[]>(config.serverUrl+'imageRepository/getByProjectId/'+projectId)
        .subscribe(res => {                
            this.containerRepo=res;
            console.log("3974628374698746934");                        
            console.log(this.containerRepo);                        
            
        } ) 
    }

    showEnvironment(projectId:number)
    {
        this.http.get<IEnvironmentProject[]>(config.serverUrl+'environment/getByProjectId/'+projectId)
        .subscribe(res => {                
            this.environment=res;
            console.log("3974628374698746934");                        
            console.log(this.environment);
            //console.log('data', this.environment[1].jsonFile);                        
            
        } ) 
    }
   fileChange(event: any) {
        // when the load event is fired and the file not empty
        if(event.target.files && event.target.files.length > 0) {
           //Fill file variable with the file content
          this.file = event.target.files[0];
        }
    }

    /*fileChange(event){       
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
             let file: File = fileList[0];
             this.file=file;
        }
    }*/
   
   saveEnvironment(provider,cluster,uname,pwd1,ddlprojects1,file){
        this.http.post<IEnvironmentBean>(config.serverUrl+'environment',
        {           
            "companyId": this.cid,
            "projectId": this.projectId,
            "envName": provider.value,
            "serviceProvider": cluster.value,
            "username": uname.value,
            "password": pwd1.value,
            
        })
        .subscribe(
            res => {
                console.log("*******************GOT  IT *********************************");                 
                console.log("envId*************",res.environment.envId);
                const formData:FormData = new FormData();
                formData.set("file", this.file);
                console.log("FILE DATA**********",formData, this.showJson);

                if(this.showJson)
                {
                    this.portfolioDetails.multipartFlag = true;
                    this.http.post(config.serverUrl+'environment/'+res.environment.envId+'/uploadfile',formData 
                      )
                        .subscribe(
                            res => {
                                console.log("*******************UPLOAD JSON*********************************");                 
                                
                            // this.surveyResponseId=res.surveyResponse.surveyResponseId;     
                                
                            uname.value="";
                            pwd1.value="";
                            cluster.selectedIndex=0;
                            provider.selectedIndex=0;
                            ddlprojects1.selectedIndex=0;
                            file = undefined;
                                //localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
                            },
                            err => {
                            console.log(err);
                            }
                        );
                }

                uname.value="";
                pwd1.value="";
                cluster.selectedIndex=0;
                provider.selectedIndex=0;
                ddlprojects1.selectedIndex=0;
                file = undefined;
                //localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
            },
            err => {
            console.log(err);
            }
        );
    }
   

    saveContainerRepo(repo,reponame,username,pwd,ddlprojects)
    {
        
        //alert('companyid:' + this.cid+'pid'+this.projectId+' '+repo.value+' '+reponame.value+' '+username.value+' '+pwd.value);
        this.http.post(config.serverUrl+'imageRepository',
        {                       
            
            "companyId": this.cid,
            "projectId": this.projectId,
            "repoServer": repo.value,
            "repoName": reponame.value,
            "username": username.value,
            "password": pwd.value
        })
        .subscribe(
            res => {
                console.log("*******************GOT  IT *********************************");                 
                
               // this.surveyResponseId=res.surveyResponse.surveyResponseId;     
                
                username.value="";
                reponame.value="";
                pwd.value="";
                repo.selectedIndex=0;
                ddlprojects.selectedIndex=0;
                //localStorage.setItem('surveyResponseId',this.surveyResponseId.toString());
            },
            err => {
            console.log(err);
            }
        );
        
    }

    deleteRepoById(repoId : number, projectId : number,index :number)
    {
        
        this.http.delete<IContainerProject[]>(config.serverUrl+'imageRepository/deleteById/'+ repoId)
        .subscribe(res => {                            
            console.log("3974628374698746934");                        
            console.log(this.containerRepo);
            this.containerRepo.splice(index,1);             
        },err => {            
            
            console.log(this.containerRepo);
        } )         
    }

    deleteEnvironmentById(envId : number, projectId : number,index :number)
    {
        
        this.http.delete<IEnvironmentProject[]>(config.serverUrl+'environment/deleteById/'+ envId)
        .subscribe(res => {                
            
            console.log("3974628374698746934");                        
            this.environment.splice(index,1);
        },err => {            
            
            console.log(this.environment);
        } ) 
        
    }
        
    setProjectId(projectId:number)
    {
        
        this.projectId=projectId;
    }

    getApps(projectId: number)
    {
        this.http.get<IApplication[]>(config.serverUrl+'project/'+projectId+'/applications')
            .subscribe(appdata => {                
                this.applications=appdata;
                console.log(this.applications);                        
            })
    }
    getUserByUsername()
    {
        //  this.http.get<IUser>('http://localhost:8090/user').subscribe(data => {  
        //     this.user=data;  
        //     console.log("CID is "+this.user.user.companyId);
        //     this.companyId=this.user.user.companyId;
            
        //     // localStorage.setItem('cid',data.user.companyId.toString());   
        //     console.log(this.user);                       
        //     // console.log("City is "+data.company.city);
        //     // console.log("Id is "+data.company.companyId);
        // }); 
           
        
    }
    getCompnayNameByCID()
    {
        // let cid=localStorage.getItem('cid');
                
       
    }

    getQuestionsByQID()
    {
        
        // this.http.get<ICompany>("http://localhost:8090/question/1").subscribe(data => {  
        //         this.company=data;  
        //         this.companyName=data.company.companyName;        
        //         console.log(data);
        //         // console.log("City is "+data.company.city);
        //         // console.log("Id is "+data.company.companyId);
        // });
    }
	
	
 //code for cluster creation
    public zoneField:boolean=true;
    public flagAWS:boolean=false;

    //on-change cloud provider function
    getProviderName(providerName){
        this.cloudProviderObj.forEach(cspObj => {
            if(cspObj.CSP === providerName){
                this.cloudProviderRenderObj = cspObj;
            }

            // set flag for AWS
            if(providerName === "AWS"){
                this.flagAWS = true;
            }

        })
    };

    //get offering value function
    getOfferingName(offerVal){
       this.zoneField = offerVal;
    }

    //Create cluster function
    createCluster(formObj,offering,csProvider){
        
        console.log("Cluster name is "+formObj.form.controls['ClusterName'].value);
        this.clusterName=formObj.form.controls['ClusterName'].value;
        
        let params = [];
        let renObj = formObj.form.controls;
        let getKeys = Object.keys(formObj.form.controls);

        getKeys.forEach(obj=> {
           params.push("&"+ obj + "=" +renObj[obj].value);
        });
         localStorage.setItem('interceptFlag','interceptFlag');
        let paramStr = params.join("").replace(";","");

        
        console.log("http://cajenkins.wiprocms.com:8080/job/caBuilds/job/AWS-EKS-Cluster");
        console.log('http://cajenkins.wiprocms.com:8080/job/caBuilds/job/'+ offering.value +'/buildWithParameters?delay=0sec'+ paramStr+'');        
        //this.http.post(config.clusterUrl+'jenkins/job/'+ offering.value +'/buildWithParameters?delay=0sec'+ paramStr,'').subscribe(
            this.http.post('http://ec2-34-234-145-85.compute-1.amazonaws.com:8080/job/caBuilds/job/'+ offering.value +'/buildWithParameters?delay=0sec'+ paramStr,'').subscribe(        
            res=>{
                    formObj.reset();
                    console.log(res);

                    this.http.get<IGrafana>(config.serverUrl+'environment/getGrafanaURL/'+this.clusterName).subscribe(
                        response =>{                            
                        this.grafanaURL=response.grafanaURL;                                                                            
                        console.log("grafana url is "+this.grafanaURL);
                        this.isGrafanaURL=true;                                         
                    });
                },
                err=>{
                    console.log(err);
                }
            );

    }
    //end Create cluster function

	
	
}

