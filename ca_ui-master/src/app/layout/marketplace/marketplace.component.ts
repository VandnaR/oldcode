import { IDockerImageBean } from './../../entities/DockerImageBean';
import { config } from './../../../assets/config/configuration';

import { IMarketplaceImages } from './../../entities/MarketplaceImages';
import { IPMDBean } from './../../entities/PMDBean';
import { PortfolioDetails } from './../../shared/services/PortfolioDetails';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IGetImageData } from '../../entities/marketplaceImage';
import { ICloneRepoMarketplace } from '../../entities/CloneRepoMP';



@Component({
    selector: 'app-marketplace',
    templateUrl: './marketplace.component.html',
    styleUrls: ['./marketplace.component.scss'],
    animations: [routerTransition()]
})
export class MarketplaceComponent implements OnInit {
      
    constructor(private http:HttpClient,private router: Router,private portfolioDetails:PortfolioDetails) {
        
    }

    cluster:any; 
    showLoad=false;
    completed=false;
    file: File;
    name;
    message="";
    public selectionModel;

    clairFileLink;
    analysisCompleted:boolean=false;
  
    username = localStorage.getItem('username');
    filterData:any = [];
    topFilter:any = [];
    topFilterShadow:any = [];
    Filters:any = [];
    filterCategories:any = [];
    topFilterFlag:boolean = false;
    dockerDTO2:any = [];
  
    storedDockerdata:any;
    dockerDTO:any=[];
    dockerData:any = [];
    createResponse:string;
    createResponse1:string;
    showResponseFlag: boolean = false;

    nameOfImage="";
    query;
    hideElem:any= {};
    toggleError:any;
    buildMessage:any;
    showBuildFlag:any;
    collectiveTags:any;
    refinedTags:any = [];
    adminhas:boolean;

    //@ViewChild('dockerFile')inputTxt:ElementRef;
    dockerFile:any;
   

    ngOnInit() { 

        //set marketPlaceFlag for interceptor
        //this.portfolioDetails.marketPlaceFlag=true;
		//company_user
        this.getDockerImageData();
		
		let tokenObj = localStorage.getItem('token');
		let sendTokenObj = JSON.parse('{"' + decodeURI(tokenObj.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
        //this.adminhas =  (sendTokenObj.username=== 'admin') ? true: false;
        this.adminhas =  (this.portfolioDetails.roleId === 1) ? true: false;        
        
    }

    getDockerImageData(){
        let _this= this;
        //http://7.147.73.34.bc.googleusercontent.com:8093/dockerImagesTags
        //config.createImagesUrl+ 'dockerImage'
        this.http.get(config.createImagesUrl+ 'dockerImage')
        .subscribe(imageData => {
            _this.dockerData = imageData;
            _this.getDockerImageTags();
            
            _this.setSubscribeData(_this.dockerData);
        },error => {
            console.log(error.status);
            console.log("Error in recieving data");
        });
    }

    setSubscribeData(data){
        
        this.dockerDTO = data.map((task) => task.dockerImagesDTO);
        this.dockerDTO2 = Object.assign(this.dockerDTO);

        this.dockerDTO.forEach(filterObj=> {
          filterObj.IsIncluded = false;
        });

        let categoryArr = [];
        let osArr = [];        
        let architectureArr = [];
        let imageTypeArr = [];
        this.dockerDTO.forEach(data=>{
            categoryArr.push(data.imageCategory);
            osArr.push(data.imageOS);  
            architectureArr.push(data.imageArchitecture);  
            imageTypeArr.push(data.imageType); 
        });
        
        //Map the data
        this.Filters = [
          {
            name: "Categories",
            properties: Array.from(new Set(categoryArr))
          },
          {
            name: "Operating Systems",
            properties: Array.from(new Set(osArr))
          },
          {
            name: "Architecture",
            properties: Array.from(new Set(architectureArr))
          },
          {
            name: "Image Type",
            properties: Array.from(new Set(imageTypeArr))
          }
        ];

        this.filterCategories = this.Filters.map((fil:any) => fil.properties);
    }

     //Main filter function to check and uncheck the checkbox
    fitlerArr(filterElem){
        let _this = this;
            this.topFilterFn(filterElem);

            if(filterElem.checked === true){
                for(let key of _this.dockerDTO2){
                    let objectKeys = Object.values(key);
                    //let selectedFilter = _this.topFilter;
                    
                    for(let kobj of objectKeys){
                        if(kobj === filterElem.value){
                            key.IsIncluded = true;
                        }
                    }
                }
                _this.pushedFilter();
            }else{
                this.unceckedFilter(filterElem)     
            }
    }

    //top filter data
    topFilterFn(filterElem){
        let _this = this;
        _this.topFilter = [];
        _this.topFilterShadow = [];

        //Change HTML collection to Array using below or [...htmlCollection];
            let liElem = Array.prototype.slice.call(filterElem.closest('.filters').getElementsByTagName('input'));
            liElem.forEach((obj,ind) => {
                if(obj.checked === true){
                    _this.topFilter.push(obj.value);
                }
            });
            if( this.topFilter.length >= 1){
                this.topFilterFlag = true;
             }else{
              this.topFilterFlag = false;
             }
    }

    //unselect filter
    unceckedFilter(filterElem){
        this.topFilterFn(filterElem);
        for(let key of this.dockerDTO2){
            let objectKeys = Object.values(key);
            const found = (this.topFilter).some(r=> objectKeys.indexOf(r) >= 0);
                if(!found){
                    key.IsIncluded = false;
                }
        }
        this.pushedFilter();
    }

     //Push selected data in main dto or object
    pushedFilter(){
        if(this.topFilter.length >= 1){
            let newDockerData:any = [];
            for(let key of this.dockerDTO2){
                if(key.IsIncluded=== true){
                let objectKeys = Object.values(key);
                    if((this.topFilter).every(elem => objectKeys.indexOf(elem) > -1)){
                        newDockerData.push(key);
                    }
                }
            }
            this.dockerDTO = newDockerData;
        }else{
            this.dockerDTO = this.dockerDTO2;
        }
    }

     //clear all filter
    clearAll(filterElem){
        this.topFilter = [];
        let liElem = Array.prototype.slice.call(filterElem.closest('.filters').getElementsByTagName('input'));
            liElem.forEach((obj) => {
                obj.checked = false;
            });
        this.dockerDTO = this.dockerDTO2;
        this.topFilterFlag = false;
    }

    //remove particular filter
    removeFilter(opt){
        let liElem = Array.prototype.slice.call(document.getElementById('checkFilter').getElementsByTagName('input'));
         let targetFilter;   
        liElem.forEach((obj) => {
                if(obj.value === opt){
                    obj.checked = false;
                    targetFilter = obj;
                }
            });
        this.unceckedFilter(targetFilter);
    }

    js_yyyy_mm_dd_hh_mm_ss () {
        let now = new Date();
        let year = "" + now.getFullYear();
        let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
       let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
       let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
       let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        };

    getDockerImageName(getimageName, tagVal){
        let _this = this;
        let tagValue:any;
        _this.showResponseFlag = false;
        if(tagVal.value){
            tagVal = ":" + tagVal.value;
        }else{
            tagVal = "";
        }
       
        let dateTimeFormat = _this.js_yyyy_mm_dd_hh_mm_ss();
        var obj = {
            "imageName": getimageName.imageName+ tagVal,
            "imagePullFlag": 'Y',
            "createdBy": localStorage.getItem('username'),
            "createdOn": dateTimeFormat
        }

        _this.showLoad = true;

        this.http.post<IGetImageData>(config.createImagesUrl+ 'dockerImage', obj)
        .subscribe(imageData => {
            _this.showResponseFlag = true;
            _this.showLoad = false;
            
            if(imageData.dockerImagesDTO.imagePullStatus === "SUCCESS"){
                _this.toggleError = false;
                _this.createResponse1 = "Pulled Successfully ";
            }else{
                _this.toggleError = true;
                _this.createResponse1 = "Failed! Invalid Tag.";
            }
            
        },error => {
            console.log("Error in recieving data");
            _this.showResponseFlag = true;
            _this.toggleError = true;
            _this.createResponse1 = "Sorry... Error found";
            _this.showLoad = false;
        });

    }

    getImageName(imageName,dockerFile){        
        this.nameOfImage="FROM "+imageName;
        dockerFile.value=this.nameOfImage.trim();
        let _this = this;

        _this.refinedTags = [];

        for(let tagObj of this.dockerDTO){
            if(imageName === tagObj.imageName){
                _this.refinedTags = tagObj.tagName;
                break;
            }
        }   
    }


    refreshImageData(){
        this.getDockerImageData();
        this.refinedTags = [];
        //this.inputTxt.nativeElement.value= ""; 
        this.showBuildFlag = false;
    }

   
    buildDockerImage(images,imageTag,dockerFile){
        //logic goes here       
        console.log(images.value+" "+imageTag.value+" "+dockerFile.value.trim());
        let _this1 = this;
        _this1.showBuildFlag = false;
        
            let dateTimeFormat = _this1.js_yyyy_mm_dd_hh_mm_ss();
            _this1.showLoad = true;
        _this1.http.post(config.createImagesUrl+ 'customDockerImages', {            
                "createStatus": "PENDING",
                "tagStatus": "PENDING",
                "pushStatus": "PENDING",
                "fromContainerRepo": "nexus",
                "tag": imageTag.value,
                "imageName": images.value,
                "dockerFile":dockerFile.value.trim(),
                "status":"ACTIVE",
                "createdBy": localStorage.getItem('username'),
                "createdOn": dateTimeFormat               
            
        })
        .subscribe(res => {
            _this1.toggleError = false;
            _this1.showBuildFlag = true;
            _this1.showLoad = false;
            this.buildMessage="Custom Docker Image built successfully!";
            _this1.getDockerImageData();


            //clair code goes here after pushing the custom image in nexus

            //set the clair Flag
            localStorage.setItem('clairFlag','1');
            //this.showLoad=true;
            this.message="Clair analysis is in progress";
            var imageNameAndTag=images.value.toLowerCase()+':'+imageTag.value;

            var imageNameWithTag=images.value.toLowerCase()+'_'+imageTag.value;

            localStorage.setItem("imageNameWithTag",imageNameWithTag);

            this.http.post<IPMDBean>(config.createImagesUrl+'customDockerImages/clairNexusAnalyze/'+imageNameAndTag,{} )
            .subscribe(res => {    
                               
                this.clairFileLink=res.filePath;
                console.log("Clair analyze completed!");   
                console.log("clair file path");
                console.log(this.clairFileLink);
                //this.router.navigate(['./blank-page']);                                    
                this.analysisCompleted=true;
                this.message="";
            })

        },error => {
            _this1.toggleError = true;
            _this1.showBuildFlag = true;
            _this1.showLoad = false;
            this.buildMessage="Error!";           
        });
        
    }

 //Get docker images tags
 getDockerImageTags(){
    let _this= this;
    //config.createImagesUrl+ 'dockerImagesTags'
    //http://7.147.73.34.bc.googleusercontent.com:8093/dockerImagesTags
    this.http.get(config.createImagesUrl+ 'dockerImagesTags')
    .subscribe(tags => {
        _this.collectiveTags = tags;
        _this.collectiveTags.forEach(tagObj=>{
            for(let getTag of _this.dockerDTO){
                if(getTag.imageId == tagObj.dockerImagesTagsDTO.imageId){
                    //getTag.tagName = tagObj.dockerImagesTagsDTO.tagName
                    if(getTag.tagName){
                        getTag['tagName'].push(tagObj.dockerImagesTagsDTO.tagName);
                        getTag.tagName =  getTag['tagName'];
                    }else{
                        getTag.tagName = [tagObj.dockerImagesTagsDTO.tagName];
                    }
                }
            }
        }); 
    },error => {
        console.log("Error in recieving data");
    });
}   

//clear tag row
clearTagRow(){
    Object.keys(this.hideElem).forEach(h => {
        this.hideElem[h] = false;
      });
}

//GEt Docker Image
getDockerImage(currentElem){
    this.showResponseFlag = false;
    Object.keys(this.hideElem).forEach(h => {
        this.hideElem[h] = false;
      });
      this.hideElem[currentElem.imageId] = true;  
}

onCustomizionRequest(imageName,tag,description,os,hardware){
    console.log(imageName.value);
    console.log(tag.value);
    console.log(description.value);
    console.log(os.value);
    console.log(hardware.value);

   let obj={       
       "imageName": imageName.value,
       "tag": tag.value,
       "description": description.value,
       "userId": localStorage.getItem('userId'),
       "os": os.value,
       "hardware": hardware.value
   };
   console.log("input  to the api" +JSON.stringify(obj));

   this.http.post<IMarketplaceImages>(config.createImagesUrl+"requestcustomimages/addImageJPATest",obj)
   .subscribe(
       res =>{
           console.log(res);
       },
       err=>{
           console.log(err);
       }
   )
}

cloneRepo(image,sourceUrl,destinationUrl,username,password){
    
    console.log("clone Repo params starts");
    console.log("image "+image.value);
    console.log("sourceUrl "+sourceUrl.value);
    console.log("destinationUrl "+destinationUrl.value);
    username.value="JayaramWipro";
    password.value="Jayaram%40123";
    console.log("username "+username.value);    
    console.log("password "+password.value);    
    console.log("clone Repo params ends");
    

    let obj={       
        "imageName": image.value,
        "sourceUrl": sourceUrl.value,
        "destinationUrl": destinationUrl.value,
        "username": username.value,
        "password": password.value
        
    };

    console.log("clone obj is ");
    console.log(JSON.stringify(obj));
 
    this.http.post<ICloneRepoMarketplace>(config.createImagesUrl+"customDockerImages/cloneRepoForMarketplace",obj)
    .subscribe(
        res =>{
            console.log("clone repo response is");
            console.log(res);

            image.value="";
            sourceUrl.value="";
            destinationUrl.value="";            
        },
        err=>{
            console.log(err);
        }
    );    
}

hardenImage(imageName,imageTag,localGit,dockerFilePath){
    console.log(imageName.value);
    console.log(imageTag.value);
    console.log(localGit.value);
    console.log(dockerFilePath.value);

    let obj={
        "ownerId": 1,
        "imageName": imageName.value,
        "imageType": "Docker Certified",
        "iconURL": "https://d1q6f0aelx0por.cloudfront.net/product-logos/56c8514a-eb15-4cc5-8e5e-3b89e7a408fa-tomcat.png",
        "imagePullFlag": "N",        
        "imagePullStatus": "PENDING",
        "imageVersion":imageTag.value,
        "localGit":localGit.value,
        "dockerFilePath":dockerFilePath.value,
        "status": "ACTIVE"
    }

    this.http.post<IDockerImageBean>(config.createImagesUrl+"dockerImage/hardenImage",obj)
    .subscribe(
        res =>{
            console.log("harden image response is");
            console.log(res);

            localStorage.setItem("imageName&Tag",imageName.value+"-"+imageTag.value);
            localStorage.setItem('clairFlag','1');

            imageName.value="";
            imageTag.value="";
            localGit.value=""; 
            dockerFilePath.value="";     
            
            this.router.navigate(['./blank-page']);
        },
        err=>{
            console.log(err);
        }
    );  

}


}

