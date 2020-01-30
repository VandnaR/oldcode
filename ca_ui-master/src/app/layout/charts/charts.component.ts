import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { ITotalScoreByAppName } from '../../entities/TotalScoreByAppName';
import { ITotalScoreByCategory } from '../../entities/TotalScoreByCategory';

import { config } from '../../../assets/config/configuration';
@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {

    totalScoreaByAppName: ITotalScoreByAppName[];
    totalScoreaByCategoryName: ITotalScoreByCategory[];
    username = localStorage.getItem('username');
    

    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Applications'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Percentage %'
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

    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
         
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
        this.http.get<ITotalScoreByAppName[]>(config.url+'totalScoreByAppName/7')
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
            this.barChartData=[{ data: per, label: 'Series A' }];
            console.log(this.barChartLabels);               
        });
    }

    ngOnInit() {
        this.http.get<ITotalScoreByCategory[]>(config.url+'totalScoreByCategory/7')
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
        });
    }
}
