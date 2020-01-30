import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { ITotalScoreByAppName } from '../../entities/TotalScoreByAppName';
import { ITotalScoreByCategory } from '../../entities/TotalScoreByCategory';
import { IPlatformFitmentProject } from '../../entities/PlatformFitmentProject';
import { IPlatformFitmentApplication } from '../../entities/PlatformFitmentApplication';


import { IProject } from '../../entities/Project';

import { config } from '../../../assets/config/configuration';

@Component({
    selector: 'app-projectadvisoryModule',
    templateUrl: './projectadvisory.component.html',
    styleUrls: ['./projectadvisory.component.scss'],
    animations: [routerTransition()]
})
export class ProjectAdvisoryComponent implements OnInit {
      
    totalScoreaByAppName: ITotalScoreByAppName[];
    totalScoreaByCategoryName: ITotalScoreByCategory[];
    platformFitmentProject: IPlatformFitmentProject[];
    platformFitmentApplication: IPlatformFitmentApplication[];

    projects : IProject[];
    username = localStorage.getItem('username');
    cid =+localStorage.getItem('companyId');
   

    // bar chart for application score view
    public barChartOptions: any = {
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
                                labelString: 'Score %'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100,                                
                            }
                        }]
                }
    };
    public barChartLabels: string[]=[
       
    ];

public barChartColors: Array<any> = [
        {
            // grey
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(128, 128, 128, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }        
    ];

    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public barChartData: any[] = [
         
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        
    ];
    public doughnutChartData: number[] = [];
    public doughnutChartType: string = 'bar';


    //bar chat for platform fitment of projects
    /*public barChartOptionsforPlatformFitmentproject: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                //labelString: 'Platform'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                //labelString: 'Score %'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100,                                
                            }
                        }]
                }
    };*/

    public barChartLabelsForPlatformFitmentproject: string[]=[
       
    ];

    public barChartTypeForPlatformFitmentproject: string = 'pie';
    public barChartLegendForPlatformFitmentproject: boolean = true;

    public barChartDataForPlatformFitmentproject: any[] = [
         
    ];


    //bar chart for application platform fitment

    public barChartOptionsPlatformFitmentApplication: any = {
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
                                labelString: 'Score %'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100,                                
                            }
                        }]
                }
    };
    public barChartLabelsForPlatformFitmentApplication: string[]=[
       
    ];

    public barChartTypePlatformFitmentApplication: string = 'bar';
    public barChartLegendPlatformFitmentApplication: boolean = true;

    public barChartDataForPlatformFitmentApplication: any[] = [
         
    ];

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
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private http:HttpClient,private router:Router) {    
        
    }

    ngOnInit() {
            this.http.get<IProject[]>(config.url+'company/'+this.cid+'/projects')
            .subscribe(projectdata => {                
                this.projects=projectdata;
                console.log(this.projects);                                         
            })  
    }

    getAdviosoryTotalScore(projectId: number){
        this.barChartLabels=[];
        this.barChartData=[];
        this.doughnutChartLabels=[];
        this.doughnutChartData=[];
        this.barChartLabelsForPlatformFitmentproject=[];
        this.barChartDataForPlatformFitmentproject=[];        
        this.barChartLabelsForPlatformFitmentApplication=[];
        this.barChartDataForPlatformFitmentApplication=[];        
        
        //getting total score by appname from the view
        this.http.get<ITotalScoreByAppName[]>(config.url+'totalScoreByAppName/'+projectId)
        .subscribe(appdata => {                                                             
            this.totalScoreaByAppName=appdata;
            console.log(this.totalScoreaByAppName);
            //let arr:string[]=[];
            let per:any[]=[];
            let bg="";
            for(let val of this.totalScoreaByAppName){
                this.barChartLabels.push(val.appName);
                // if(val.percentage < 70){
                //      bg="#eebcde";
                // } 
                // else{
                //     bg="#DC143C";
                // }
                per.push(val.percentage);
            }            
            //per.push(100);
            //this.barChartLabels=arr;
            this.barChartData=[{ data: per, label: 'Applications' }];
            console.log(this.barChartLabels);  
            //
            this.http.get<ITotalScoreByCategory[]>(config.url+'totalScoreByCategory/'+projectId)
                .subscribe(appdata => {                                                             
                    this.totalScoreaByCategoryName=appdata;
                    console.log(this.totalScoreaByCategoryName);
                    //let arr:string[]=[];
                    let per:number[]=[];
                    let bg="";
                    for(let val of this.totalScoreaByCategoryName){
                        this.doughnutChartLabels.push(val.categoryName);
                        // if(val.percentage < 70){
                        //      bg="#eebcde";
                        // } 
                        // else{
                        //     bg="#DC143C";
                        // }
                        per.push(val.percentage);
                    }            
                    //per.push(100);
                    //this.barChartLabels=arr;
                    this.doughnutChartData=per;
                    console.log(this.barChartLabels);

                    //platform fitment projects
                    this.http.get<IPlatformFitmentProject[]>(config.url+'platformFitmentProject/'+projectId)
                        .subscribe(appdata => {                                                             
                            this.platformFitmentProject=appdata;
                            console.log(this.platformFitmentProject);
                            //let arr:string[]=[];
                            let per:any[]=[];
                            let bg="";
                            for(let val of this.platformFitmentProject){
                                this.barChartLabelsForPlatformFitmentproject.push(val.platform);
                                // if(val.percentage < 70){
                                //      bg="#eebcde";
                                // } 
                                // else{
                                //     bg="#DC143C";
                                // }
                                per.push(val.percentage);
                            }            
                            //per.push(100);
                            //this.barChartLabels=arr;
                            this.barChartDataForPlatformFitmentproject=[{ data: per, label: 'Platform Fitment' }];
                            console.log(this.barChartLabelsForPlatformFitmentproject);

                            //platform fitment application
                            this.http.get<IPlatformFitmentApplication[]>(config.url+'platformFitmentApplication/'+projectId)
                                .subscribe(appdata => {                                                             
                                    this.platformFitmentApplication=appdata;
                                    console.log(this.platformFitmentApplication);
                                    //let arr:string[]=[];
                                    //let per_data_series1:any[]=[];
                                    let per_data_series2:any[]=[];
                                    let per_data_series3:any[]=[];
                                    let per_data_series4:any[]=[];
                                    let per_data_series5:any[]=[];

                                    let bg="";
                                    for(let i=0;i<this.platformFitmentApplication.length;i++){
                                        if(i%4 == 0)
                                        {
                                            this.barChartLabelsForPlatformFitmentApplication.push(
                                            this.platformFitmentApplication[i].appName
                                            )
                                            per_data_series5.push(this.platformFitmentApplication[i].percentage);
                                        }
                                        if(i%4 == 1)
                                        {                                            
                                            per_data_series2.push(this.platformFitmentApplication[i].percentage);
                                        }
                                        if(i%4 == 2)
                                        {                                            
                                            per_data_series3.push(this.platformFitmentApplication[i].percentage);
                                        }
                                        if(i%4 == 3)
                                        {                                            
                                            per_data_series4.push(this.platformFitmentApplication[i].percentage);
                                        }
                                        /*if(i%5 == 4)
                                        {                                            
                                            per_data_series5.push(this.platformFitmentApplication[i].percentage);
                                        }*/

                                        //this.barChartDataForPlatformFitmentproject=[{ data: per, label: 'Platform Fitment' }];
                                        // if(val.percentage < 70){
                                        //      bg="#eebcde";
                                        // } 
                                        // else{
                                        //     bg="#DC143C";
                                        // }
                                        //per.push(val.percentage);
                                    }            
                                    //per.push(100);
                                    //this.barChartLabels=arr;
                                   this.barChartDataForPlatformFitmentApplication=[
                                            /*{ data: per_data_series1, label: 'Docker EE' },*/
                                            { data: per_data_series2, label: 'AKS' },
                                            { data: per_data_series3, label: 'OpenShift' },
                                            { data: per_data_series4, label: 'GKE' },
                                            { data: per_data_series5, label: 'Amazon EKS' }
                                       ];
                                    console.log(this.barChartDataForPlatformFitmentApplication); 
                                    console.log(this.barChartLabelsForPlatformFitmentApplication);                      
                                });                         
                        });                                    
                });             
        });
    }
}

