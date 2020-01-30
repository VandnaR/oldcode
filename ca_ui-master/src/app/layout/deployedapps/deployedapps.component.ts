import { IGetOCPDeployedApps } from './../../entities/GetOCPDeployedApps';
import { IOCPProjects } from './../../entities/OCPProjects';
import { IGetClusters } from './../../entities/GetClusters';
import { IGetGCPDeployedApps } from './../../entities/GetGCPDeployedApps';
import { IGetImages } from './../../entities/GetImages';
import { IContainerProject } from './../../entities/ContainerRepository';
import { IAutoDeployProject } from './../../entities/AutoDeploy';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IProject } from '../../entities/Project';
import { IApplication } from '../../entities/Application';
import { Observable } from 'rxjs';
import { config } from '../../../assets/config/configuration';

@Component({
    selector: 'app-deployedapps',
    templateUrl: './deployedapps.component.html',
    styleUrls: ['./deployedapps.component.scss'],
    animations: [routerTransition()]
})
export class DeployedAppsComponent implements OnInit {
    
    GCPApps : IGetGCPDeployedApps[]=[];
    projects : IProject[];
    oCPProjects:IOCPProjects[];

    username = localStorage.getItem('username');
    heading:IGetGCPDeployedApps;
    showOcProjects:boolean=false;
    OCPDeployedApps:IGetOCPDeployedApps[];
    

    constructor(private http:HttpClient,private router: Router) {
        
    }
     

    cluster;
    clusters : IGetClusters[];
    showDeployedApp=false;
    showDeployedOCPApp=false;
    clusterName;
    envName;
    
    ngOnInit() {     
        
    }
    
    

    showDeployedApps(clusterName:string){
        this.clusterName=clusterName;        
        console.log(this.clusterName);

        if(this.envName=="Google Cloud"){
            this.showDeployedApp=true;
            this.showDeployedOCPApp=false;
            this.http.get<IGetGCPDeployedApps[]>(config.serverUrl+'autoDeploy/getGCPDeployedApps/'+this.clusterName)
            .subscribe(res => {
            console.log(res);
            this.heading=res[0];
            this.heading.name="NAME";
            console.log("headings "+this.heading);
            for(let i=1;i<res.length;i++){
                this.GCPApps.push(res[i]);
            }                
            console.log("Data "+this.GCPApps);
            //console.log(this.GCPApps);                                         
            });
        }
        else if(this.envName=="AWS"){
            this.GCPApps=[];                        
            this.showDeployedApp=true;
            this.showDeployedOCPApp=false;
            this.http.get<IGetGCPDeployedApps[]>(config.serverUrl+'autoDeploy/getAWSDeployedApps/'+this.clusterName)
            .subscribe(res => {
            console.log(res);
            this.heading=res[0];
            this.heading.name="NAME";
            console.log("headings "+this.heading);
            for(let i=1;i<res.length;i++){
                this.GCPApps.push(res[i]);
            }                
            console.log("Data "+this.GCPApps);
            //console.log(this.GCPApps);                                         
            });
        }
        else if(this.envName=="Openshift"){
            this.GCPApps=[];
            this.showDeployedApp=false;
            this.showDeployedOCPApp=true;
            this.http.get<IGetOCPDeployedApps[]>(config.serverUrl+'autoDeploy/getOCPDeployedApps/'+this.clusterName)
            .subscribe(res => {      
            this.OCPDeployedApps=res;      
            console.log("Data "+this.OCPDeployedApps);
            //console.log(this.GCPApps);                                         
            });
        }
        else if(this.envName=="Azure"){
            this.GCPApps=[];                        
            this.showDeployedApp=true;
            this.showDeployedOCPApp=false;
            this.http.get<IGetGCPDeployedApps[]>(config.serverUrl+'autoDeploy/getAzureDeployedApps/'+this.clusterName)
            .subscribe(res => {
            console.log(res);
            this.heading=res[0];
            this.heading.name="NAME";
            console.log("headings "+this.heading);
            for(let i=1;i<res.length;i++){
                this.GCPApps.push(res[i]);
            }                
            console.log("Data "+this.GCPApps);
            console.log(this.GCPApps);                                         
            });
        }
               
    }

    getClusters(envname:string)
    {
        this.showOcProjects=false;
        this.envName=envname;
        if(envname=="Google Cloud")
        {            
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getGCPClusters')
                .subscribe(res => {
                this.clusters=res;
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
            .subscribe(res => {
            this.clusters=res;
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
        else 
        {
            this.http.get<IGetClusters[]>(config.serverUrl+'autoDeploy/getPCFClusters')
            .subscribe(projectdata => {
            this.clusters=projectdata;
            console.log(this.projects);                               
            }); 
        }        
     
    }

    
}

