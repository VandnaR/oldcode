import { IEmailBean } from './../../entities/EmailBean';
import { IUser } from './../../entities/User';
import { config } from './../../../assets/config/configuration';
import { IMarketplaceImages } from './../../entities/MarketplaceImages';
import { IRolesList } from './../../entities/RolesList';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from '@angular/forms';

import { IUserCompanyNameBean } from '../../entities/UserCompanyNameBean';
import { IProjectList} from '../../entities/ProjectList';
import { ICompanyList } from '../../entities/CompanyList';
import { IApplication } from '../../entities/Application';
import { IAssessment } from '../../entities/Assessment';
import { IAssessmentDetails } from '../../entities/AssessmentDetails';

import { IProjectCompanyNameBean } from '../../entities/ProjectCompanyNameBean';
import { IProject} from '../../entities/Project';
import { IProjectBean} from '../../entities/ProjectBean';


import { Observable } from 'rxjs';
import { ICategory} from '../../entities/Category';

import { ICompany } from '../../entities/Company';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [routerTransition()]
})
export class AdminComponent implements OnInit {
      
    constructor(private http:HttpClient) {
        this.showPass = false;
    }

    title = '';
    user:IUser;
    companyEmail;

    @ViewChild('closeCompanyBtn') closeCompanyBtn;

    companyForm= new FormGroup({
        companyname: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        country: new FormControl(''),
        zipcode: new FormControl(''),
        website: new FormControl(''),        
    });

    mode='';
    showPass:boolean;
    disableBtnCompany:boolean;
    disableBtnProject:boolean;
    disableBtnUser:boolean;

    editCompanyId=0;
    editCompany:ICompanyList;
    editProjectId=0;
    editProject:IProjectCompanyNameBean;
    editUserId=0;
    editUser:IUserCompanyNameBean;

    selectedProjectCompanyName:string;
    selectedUserCompanyName:string;
    selectedRoleOfUser:string;

    allcompany:ICompanyList[];
    allprojects:IProjectCompanyNameBean[];
    allusers: IUserCompanyNameBean[];
    allroles:IRolesList[];
    MarketplaceImages:IMarketplaceImages[];

    username = localStorage.getItem('username');   

    ngOnInit() {   
        //alert(localStorage.getItem('roleId'));
        if(localStorage.getItem('roleId') === '1'){
            this.disableBtnCompany=false;
        }
        else if(localStorage.getItem('roleId') === '2'){
            this.disableBtnCompany=true;
        }
        else{
            this.disableBtnCompany=true;
            this.disableBtnProject=true;
            this.disableBtnUser=true;            
        }

        //getting all companies
          this.http.get<ICompanyList[]>(config.url+'companies')
          .subscribe(appdata => {                                                             
              this.allcompany=appdata;
              console.log(appdata);                                  
          }) 

            //getting all projects with company name
          this.http.get<IProjectCompanyNameBean[]>(config.url+'projects')
          .subscribe(appdata => {                                                             
              this.allprojects=appdata;
              console.log(appdata);                                  
          }) 

        //getting all users with role and company Name
        this.http.get<IUserCompanyNameBean[]>(config.url+'users')
        .subscribe(appdata => {                                                             
            this.allusers=appdata;
            console.log(appdata);                                  
        }) 
        
        //getting all roles
        this.http.get<IRolesList[]>(config.url+'getAllRoles')
        .subscribe(appdata => {                                                             
            this.allroles=appdata;
            console.log(appdata);                                  
        })        

        //getting all images of request
        this.http.get<IMarketplaceImages[]>(config.createImagesUrl+'requestcustomimages/getAllImagesJPA')
        .subscribe( data => {
                this.MarketplaceImages = data;
                console.log("MarketplaceImages images");
                console.log(this.MarketplaceImages);
            
                } 
            );

    }   

    onhaha(){
        alert("hi");
        console.log(this.companyForm.value);
    }

    onEditCompany(company:ICompanyList){

        this.mode='updateCompany';
        this.editCompanyId=company.companyId;
        this.editCompany=company;
        //alert(this.editId);
        this.companyForm.setValue({
            companyname: company.companyName,
            address1: company.address,
            address2: company.address2,
            city: company.city,
            state: company.state,
            country: company.country,
            zipcode: company.zipcode,
            website: company.companyUrl,
        });                
        /*companyname.value=company.companyName;
        address1.value=company.address;
        address2.value=company.address2;
        city.value=company.city;
        state.value=company.state;l
        country.value=company.country;
        zipcode.value=company.zipcode;
        website.value=company.companyUrl;*/
    }

    onAddOrUpdateCompany(){                
        if(this.mode ==='addCompany')
        {           
            //console.log(companyname.value,address1.value,address2.value,city.value,state.value,country.value,zipcode.value,website.value);
            //save new company
            this.http.post<ICompany>(config.url+'company',
            {                               
                "address": this.companyForm.get('address1').value,
                "address2": this.companyForm.get('address2').value,                
                "city": this.companyForm.get('city').value ,
                "companyName": this.companyForm.get('companyname').value ,
                "companyUrl": this.companyForm.get('website').value ,
                "country": this.companyForm.get('country').value ,                                                
                "state": this.companyForm.get('state').value ,
                "fax" : '',
                "phone": '',
                "cell": '',               
                "zipcode": this.companyForm.get('zipcode').value
            })
            .subscribe(appdata => {      
                    console.log("Addding new company");                                                       
                    console.log(appdata);                       
                    this.allcompany.push(appdata.company);
                    //this.onCompanyClose();
                    this.closeCompanyBtn.nativeElement.click();
                    
            }) 
        }
        else if(this.mode ==='updateCompany')
        {
            //update the existing record
            this.http.put<ICompany>(config.url+'company/'+this.editCompanyId,
            {
                "address": this.companyForm.get('address1').value,
                "address2" : this.companyForm.get('address2').value,            
                "city" : this.companyForm.get('city').value,
                "companyName" : this.companyForm.get('companyname').value,
                "companyUrl" : this.companyForm.get('website').value,
                "country" : this.companyForm.get('country').value,
                "state" : this.companyForm.get('state').value,
                "zipcode" : this.companyForm.get('zipcode').value 
            })
            .subscribe(appdata => {                                                             
                    console.log(appdata);    
                    console.log(this.allcompany);
                    let indexTobeRemoved=this.allcompany.indexOf(this.editCompany);
                    //alert(indexTobeRemoved);
                    this.allcompany.splice(indexTobeRemoved,1);
                    console.log(this.allcompany);
                    this.allcompany.splice(indexTobeRemoved,0,appdata.company);
                    console.log(this.allcompany);  

                    //rest the company id
                    this.editCompanyId=0; 
                    this.closeCompanyBtn.nativeElement.click();
                    //this.onCompanyClose();
                    
            }) 
        }
    }


    onAddCompany(){
        this.mode='addCompany';
        this.onCompanyClose();
        //console.log(companyName.value,address1.value,address2.value,city.value,state.value,country.value,zipCode.value,website.value);
    }

    onDeleteCompany(comapnyId:number,index:number){
        this.http.delete(config.url+'company/'+comapnyId)
        .subscribe(appdata =>{

        },
        err=>{
            console.log(err);
            if(err.status==200)
            {
                this.allcompany.splice(index,1);
            }
            else{
                confirm("Do you want to delete all the data related to the selected company?");
            }
            
        })
    }

    onCompanyClose(){
       this.companyForm.reset();
    }


    onEditProject(projectCompanyNameBean:IProjectCompanyNameBean,portfolioName,projectCompanyName){
        this.mode='updateProject';
        this.editProjectId=projectCompanyNameBean.project.projectId;
        this.editProject=projectCompanyNameBean;
        portfolioName.value=projectCompanyNameBean.project.projectName;
        //projectCompanyName.value=projectCompanyNameBean.companyName;
        this.selectedProjectCompanyName=projectCompanyNameBean.companyName;        

    }

    onAddOrUpdateProject(portfolioName,projectCompanyName){

        console.log(portfolioName.value,projectCompanyName.value);
        if(this.mode ==='addProject')
        {           
            //console.log(companyname.value,address1.value,address2.value,city.value,state.value,country.value,zipcode.value,website.value);
            //save new company
            this.http.post<IProjectCompanyNameBean>(config.url+'project',
            {               
                "projectName": portfolioName.value,
                "companyId": projectCompanyName.value
            })
            .subscribe(appdata => {      
                    console.log("Adding new project");                                                       
                    console.log(appdata);                       
                    this.allprojects.push(appdata);
                    this.onProjectClose(portfolioName,projectCompanyName);
                    
            }) 
        }
        else if(this.mode ==='updateProject')
        {
            //update the existing record
            this.http.put<IProjectCompanyNameBean>(config.url+'project/'+this.editProjectId,
            {
                "projectName": portfolioName.value,
                "companyId": projectCompanyName.value
            })
            .subscribe(appdata => {                                                             
                    console.log(appdata);
                    let indexTobeRemoved=this.allprojects.indexOf(this.editProject);                    
                    this.allprojects.splice(indexTobeRemoved,1);                    
                    this.allprojects.splice(indexTobeRemoved,0,appdata);                     
                    //rest the company id                
                    this.onProjectClose(portfolioName,projectCompanyName);
                    
            }) 
        }
    }

    onAddProject(portfolioName,projectCompanyName){
        this.mode="addProject";
        this.onProjectClose(portfolioName,projectCompanyName);
    }

    onDeleteProject(projectId:number,index:number){
        //alert(projectId);                                      
        this.http.delete(config.url+'project/'+projectId)
        .subscribe(appdata => {                                                                                                         console.log(appdata);
            },
        err=>{
            this.allprojects.splice(index,1);
        })  
    }

    onProjectClose(portfolioName,projectCompanyName){
        portfolioName.value='';
        this.selectedProjectCompanyName='';             
    }


    onEditUser(userCompanyNameBean:IUserCompanyNameBean,userId,username,password,role,userCompanyName,companyEmail,phone){
        this.mode='updateUser';
        this.editUserId=userCompanyNameBean.user.userId;
        this.editUser=userCompanyNameBean;
        userId.value=userCompanyNameBean.user.username;
        username.value=userCompanyNameBean.user.fullname;
        password.value=userCompanyNameBean.user.password;        
        companyEmail.value=userCompanyNameBean.user.companyEmail;
        phone.value=userCompanyNameBean.user.cell;
        this.selectedUserCompanyName=userCompanyNameBean.companyName; 
        this.selectedRoleOfUser=userCompanyNameBean.role;     
    }

    onAddOrUpdateUser(userId,username,password,role,userCompanyName,companyEmail,phone){
        //console.log(portfolioName.value,projectCompanyName.value);
        console.log(role.value);
        if(this.mode ==='addUser')
        {           
           
            //save new user
            this.http.post<IUserCompanyNameBean>(config.url+'user',
            {               
                "cell": phone.value,
                "companyEmail": companyEmail.value,                
                "emailValidatedFlag": "",
                "fax": "",
                "fullname": username.value,
                "phone": "",
                // "updatedBy": "Deepak",
                // "updatedOn": "2018-08-14 11:53:50",
                "username": userId.value,
                "companyId": userCompanyName.value,
                "roleId":role.value,
                "password":password.value
            })
            .subscribe(appdata => {      
                    console.log("Adding new user");                                                       
                    console.log(appdata);                       
                    this.allusers.push(appdata);
                    this.onUserClose(userId,username,password,role,userCompanyName,companyEmail,phone);
                    
            }) 
        }
        else if(this.mode ==='updateUser')
        {
            //update the existing record
            this.http.put<IUserCompanyNameBean>(config.url+'user/'+this.editUserId,
            {                
                "cell": phone.value,
                "companyEmail": companyEmail.value,                
                "emailValidatedFlag": "",
                "fax": "",
                "fullname": username.value,
                "phone": "",
                // "updatedBy": "Deepak",
                // "updatedOn": "2018-08-14 11:53:50",
                "username": userId.value,
                "companyId": userCompanyName.value,
                "roleId":role.value,
                "password":password.value
            })
            .subscribe(appdata => {                                                             
                    console.log(appdata);
                    let indexTobeRemoved=this.allusers.indexOf(this.editUser);                    
                    this.allusers.splice(indexTobeRemoved,1);         
                    this.allusers.splice(indexTobeRemoved,0,appdata);                     
                    //rest the company id                
                    this.onUserClose(userId,username,password,role,userCompanyName,companyEmail,phone);
                    
            }) 
        }
    }

    onAddUser(userId,username,password,role,userCompanyName,companyEmail,phone){
        this.mode="addUser";
        //console.log(this.mode);
        this.onUserClose(userId,username,password,role,userCompanyName,companyEmail,phone);
    }

    onDeleteUser(userId:number,index:number){
        this.http.delete(config.url+'user/'+userId)
        .subscribe(appdata =>{

        },
        err=>{
            this.allusers.splice(index,1);
        })
    }
    onUserClose(userId,username,password,role,userCompanyName,companyEmail,phone){
        userId.value='';
        username.value='';
        companyEmail.value='';
        phone.value='';
        role.value='';
        password.value='';
        this.selectedUserCompanyName='';
        this.selectedRoleOfUser='';
        this.showPass=false;
    }

    ShowPassword(){
        this.showPass = !this.showPass;
    }
    onClickCheckbox(userid)
    {

        this.http.get<IUser>(config.url+'user/'+userid)
        .subscribe(userdata => {
            this.user=userdata;
            //console.log(this.user.user.companyEmail);    
            this.companyEmail=this.user.user.companyEmail;  
            console.log("Email is"+ this.companyEmail);
                        
        });
        //console.log(userid);
    }

    onRequestCompleted(){

        alert("Do you want to send email??");
        //send email to backend of marketplace
        this.http.post<IEmailBean>(config.createImagesUrl+'requestcustomimages/awsAutoMail',{
            "emailTo": this.companyEmail                
        })
        .subscribe(appdata => {                                                             
            console.log(appdata);                
        });
    }

   
}

