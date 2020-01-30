import { PortfolioDetails } from './../../shared/services/PortfolioDetails';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { ICompanyPortfolio } from '../../entities/CompanyPortfolio';
import { IBuildOrDeployStatus } from '../../entities/BuildOrDeployStatus';
import { IAssessmentStatus } from '../../entities/AssessmentStatus';
import { ICompany } from '../../entities/Company';
import { IUser } from '../../entities/User';

import { config } from '../../../assets/config/configuration';
import { i18nApply } from '@angular/core/src/render3/i18n';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    companyPortfolio: ICompanyPortfolio[];
    buildStatus: IBuildOrDeployStatus[];
    deployStatus: IBuildOrDeployStatus[];
    asssessmentStatus: IAssessmentStatus[];

    user: IUser;
    company: ICompany;
    companyId: number;
    companyName: string;
    roleId: number;

    cid = +localStorage.getItem('companyId');
    username = localStorage.getItem('username');

    // company portfolio bar chart
    public companyPortfolioBarChartOptions: any = {
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
                    labelString: 'App Count'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 20,
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
    public companyPortfolioBarChartLabels: string[] = [
    ];

    //public barChartType: string = 'horizontalBar';
    public companyPortfolioBarChartType: string = 'bar';
    public companyPortfolioBarChartLegend: boolean = false;
    public companyPortfolioBarChartData: any[] = [
    ];

    public companyPortfolioBarChartColors: Array<any> = [
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


    // build status portfolio bar chart
    public buildStatusBarChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: ''
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'App Count'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 15,
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
    public buildStatusBarChartLabels: string[] = [
    ];

    //public barChartType: string = 'horizontalBar';
    public buildStatusBarChartType: string = 'bar';
    public buildStatusBarChartLegend: boolean = false;
    public buildStatusBarChartData: any[] = [
    ];

    public buildStatusBarChartColors: Array<any> = [
        {
            backgroundColor: [
                'rgba(255, 159, 64, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',

            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',

            ],
            borderWidth: 1
        }
    ];

    // deploy status portfolio bar chart
    public deployStatusBarChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: ''
                }
            }],
            yAxes: [{

                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'App Count'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 20,
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
    public deployStatusBarChartLabels: string[] = [
    ];

    //public barChartType: string = 'horizontalBar';
    public deployStatusBarChartType: string = 'bar';
    public deployStatusBarChartLegend: boolean = false;
    public deployStatusBarChartData: any[] = [
    ];

    public deployStatusBarChartColors: Array<any> = [
        {
            backgroundColor: [
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(75, 192, 192, 0.4)',

            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',

            ],
            borderWidth: 1
        }
    ];


    //assessment status 

    public assessmentStatusBarChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'App Count'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 15,
                }
            }],
            yAxes: [{

                display: true,
                scaleLabel: {
                    display: true,
                },

            }]
        }
    };
    public assessmentStatusBarChartLabels: string[] = [
    ];

    //public assessmentStatusBarChartType: string = 'bar';
    public assessmentStatusBarChartType: string = 'horizontalBar';
    public assessmentStatusBarChartLegend: boolean = true;
    public assessmentStatusBarChartData: any[] = [
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [

    ];
    public doughnutChartData: number[] = [];
    public doughnutChartType: string = 'doughnut';

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string = 'radar';

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.companyPortfolioBarChartData));
        clone[0].data = data;
        this.companyPortfolioBarChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private http: HttpClient, private router: Router, public portfolioDetails: PortfolioDetails) {

        /* 
                    Calling two get request to fetch user data and then the company of
                    the logged-in user by passing the userId retured in first get request  
                */

        //get user by username

        this.http.get<IUser>(config.url + 'user')
            .subscribe(userdata => {
                this.user = userdata;
                this.companyId = userdata.user.companyId;
                this.portfolioDetails.setUsername(userdata.user.username);
                localStorage.setItem('roleId', this.user.user.roleId.toString());
                this.roleId = this.user.user.roleId;
                //alert(this.companyId);
                if (this.username != 'admin') {
                    localStorage.setItem('companyId', this.companyId.toString());
                    this.cid = +localStorage.getItem('companyId');
                }
                localStorage.setItem('userId', userdata.user.userId.toString());
                console.log(this.user);
                this.http.get<ICompany>(config.url + 'company/' + this.companyId)
                    .subscribe(companydata => {
                        this.company = companydata;
                        this.companyName = this.company.company.companyName;
                        if (this.roleId != 1) {
                            this.portfolioDetails.setCompanyname(this.companyName);
                        }
                        this.portfolioDetails.showCompanyNameAndUsernameDetails();
                        localStorage.setItem('companyName', this.companyName);
                        console.log(this.company);

                        //companyportfolio    
                        this.http.get<ICompanyPortfolio[]>(config.url + 'companyPortfolio/' + this.cid)
                            .subscribe(appdata => {
                                this.companyPortfolio = appdata;
                                let noOfApps: any[] = [];
                                let bg = "";
                                for (let val of this.companyPortfolio) {
                                    this.companyPortfolioBarChartLabels.push(val.projectName);
                                    noOfApps.push(val.totalApps);
                                }
                                this.companyPortfolioBarChartData = [{ data: noOfApps }];
                                console.log(this.companyPortfolioBarChartLabels);
                                console.log(this.companyPortfolioBarChartData);

                                //buildstatus

                                this.http.get<IBuildOrDeployStatus[]>(config.url + 'buildStatus/' + this.cid)
                                    .subscribe(appdata => {
                                        this.buildStatus = appdata;
                                        //console.log(this.totalScoreaByAppName);            
                                        let noOfApps: any[] = [];
                                        let bg = "";
                                        for (let val of this.buildStatus) {
                                            this.buildStatusBarChartLabels.push(val.projectName);
                                            noOfApps.push(val.total);
                                        }
                                        this.buildStatusBarChartData = [{ data: noOfApps }];
                                        //console.log(this.buildStatusBarChartLabels); 

                                        //deploy status
                                        this.http.get<IBuildOrDeployStatus[]>(config.url + 'deployStatus/' + this.cid)
                                            .subscribe(appdata => {
                                                this.deployStatus = appdata;
                                                //console.log(this.totalScoreaByAppName);            
                                                let noOfApps: any[] = [];
                                                let bg = "";
                                                for (let val of this.deployStatus) {
                                                    this.deployStatusBarChartLabels.push(val.projectName);
                                                    noOfApps.push(val.total);
                                                }
                                                this.deployStatusBarChartData = [{ data: noOfApps }];
                                                console.log(this.deployStatusBarChartLabels);

                                                //platform fitment application    
                                                this.http.get<IAssessmentStatus[]>(config.url + 'assessmentStatus/' + this.cid)
                                                    .subscribe(appdata => {
                                                        this.asssessmentStatus = appdata;
                                                        console.log("************" + this.asssessmentStatus);
                                                        let per_data_series1: any[] = [];
                                                        let per_data_series2: any[] = [];
                                                        let projectName: any;
                                                        let oldProjectName: any;
                                                        for (let i = 0; i < this.asssessmentStatus.length; i++) {
                                                            projectName = this.asssessmentStatus[i].projectName;
                                                            if (i == 0) {
                                                                if (this.asssessmentStatus[i].app_status == "Initiated") {
                                                                    this.assessmentStatusBarChartLabels.push(projectName);
                                                                    per_data_series1.push(this.asssessmentStatus[i].total);
                                                                    if (this.asssessmentStatus[i + 1].projectName != projectName) {
                                                                        per_data_series2.push(0);
                                                                        if ((this.asssessmentStatus.length - 1) != i) {
                                                                            i = i + 1;
                                                                        }
                                                                    }
                                                                } else {
                                                                    this.assessmentStatusBarChartLabels.push(projectName);
                                                                    per_data_series2.push(this.asssessmentStatus[i].total);
                                                                    per_data_series1.push(0);
                                                                }
                                                            }
                                                            else if (oldProjectName == projectName) {
                                                                per_data_series2.push(this.asssessmentStatus[i].total);
                                                            }
                                                            else if (oldProjectName != projectName) {
                                                                if (this.asssessmentStatus[i].app_status == "Initiated") {
                                                                    this.assessmentStatusBarChartLabels.push(projectName);
                                                                    per_data_series1.push(this.asssessmentStatus[i].total);
                                                                    if (this.asssessmentStatus[i + 1].projectName != projectName) {
                                                                        per_data_series2.push(0);
                                                                        if ((this.asssessmentStatus.length - 1) != i) {
                                                                            i = i + 1;
                                                                        }
                                                                    }
                                                                } else {
                                                                    this.assessmentStatusBarChartLabels.push(projectName);
                                                                    per_data_series2.push(this.asssessmentStatus[i].total);
                                                                    per_data_series1.push(0);
                                                                }
                                                            }

                                                            /*if(i%2 == 0)
                                                            {
                                                                this.assessmentStatusBarChartLabels.push(                        
                                                                this.asssessmentStatus[i].projectName
                                                                )
                                                                per_data_series1.push(this.asssessmentStatus[i].total);
                                                            }
                                                            if(i%2 == 1)
                                                            {                                            
                                                                per_data_series2.push(this.asssessmentStatus[i].total);
                                                            }*/
                                                            oldProjectName = projectName;
                                                        }
                                                        //per.push(100);
                                                        //this.barChartLabels=arr;
                                                        this.assessmentStatusBarChartData = [
                                                            /*{ data: per_data_series1, label: 'Docker EE' },*/
                                                            { data: per_data_series1, label: 'Initiated' },
                                                            { data: per_data_series2, label: 'Completed' }
                                                        ];
                                                    });
                                            })
                                    })
                            });
                    }, error => {
                        console.log(error);
                        if (error.error.company == null && error.status == 500) {
                            this.router.navigate(['/login']);
                        }
                    })
            })
    }

    ngOnInit() {
    }
    public alerts: Array<any> = [];
    /*public sliders: Array<any> = [];

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    
    ngOnInit() {
       
    }*/

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
