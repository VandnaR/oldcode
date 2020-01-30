import { PortfolioDetails } from './../../../shared/services/PortfolioDetails';
import { config } from './../../../../assets/config/configuration';

import { Component, OnInit,Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';    
              
     username=localStorage.getItem('username');    
     companyName; 
     showSetting;     
    @Input() userCompanyName:string;

    constructor(private translate: TranslateService, private http: HttpClient, public router: Router,public portfolioDetails:PortfolioDetails) {

    if(this.username!=="admin")
    {
            this.showSetting=true;
    }
    else{
        this.showSetting=true;
    }

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });        
    }
 
    ngOnInit() {            
         this.getnotificationdata() 
    }
    
    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() { 
        
        let redURL = encodeURIComponent(document.location.origin + '/CA&clientAppId=' +config.clientAppId+ '&clientAppSecret=' + config.clientAppSecret);                
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('username');
        localStorage.removeItem('categoryId'); 
        localStorage.removeItem('companyId');
        localStorage.removeItem('userId');  
        localStorage.removeItem('surveyResponseId');  
        localStorage.removeItem('applId');  
        localStorage.removeItem('appId'); 
        localStorage.removeItem('token');  
        window.open(config.login_url+"?redirectUrl="+redURL,'_self');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
        public notificationdata:any;
    getnotificationdata(){
        this.http.get(config.url + 'environment/getVmToDockerList')
            .subscribe(res => {
                this.notificationdata = res;
                console.log(" Notification data my check"+ JSON.stringify(this.notificationdata));
                setTimeout(() => {

                    this.getnotificationdata();

                  
                }, 60000);
            })
    }
}
