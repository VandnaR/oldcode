import { ISurveyResponseQ } from '../../entities/SurveyResponseQ';
import { ISurveyResponseAnswer } from '../../entities/SurveyResponseAnswers';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { ICategory} from '../../entities/Category';
import { config } from '../../../assets/config/configuration';
import { Injectable } from '@angular/core';
import { ITwelveFactorReport } from '../../entities/TwelveFactorReport';

@Injectable()
export class AssessmentService {
    private surveyResponseQ : ISurveyResponseQ []=[];
    private surveyResponseAnswer : ISurveyResponseAnswer[]=[];
    private ansArr = [];

    public hiddenQuesId=[18,19,20,21,22,29,30,43];
    public hiddenCategory=['UI Layer','OS Layer','App Runtime','Business Logic Layer','Data Storage','DevOps','12 Factor Compatibility'];

    public ERP=8;
    username = localStorage.getItem('username');

    category : ICategory[];
    public twelveFactorReport: ITwelveFactorReport[];
    
    constructor(private http:HttpClient) {
        
        //getting all the categories
            this.http.get<ICategory[]>(config.url+'category')
            .subscribe(appdata => {                                                             
                this.category=appdata;
                console.log("**************");                        
                console.log(this.category);                        
            })
    }

    addSurveyResponseQ(val) {
        this.surveyResponseQ.push(val);
    }

    getSurveyResponseQ() {
        return this.surveyResponseQ;
    }

    clearSurveyResponseQ(){
        this.surveyResponseQ=[];
    }
    
    addSurveyResponseAnswer(val) {
        this.surveyResponseAnswer.push(val);
    }

    getSurveyResponseAnswer() {
        return this.surveyResponseAnswer;   
    }

    clearSurveyResponseAnswer(){
       this.surveyResponseAnswer=[];
    }

    deleteSurveyResponseAnswer(index){
        this.surveyResponseAnswer.splice(index,1);
    }

    addAnsArr(val){
        this.ansArr.push(val);
    }
    
    getAnsArr(){
        return this.ansArr;
    }

    removeAnswerArr(answerId){
        this.ansArr.splice(this.ansArr.indexOf(answerId),1);
    }

    clearAnsArr(){
        this.ansArr=[];
    }

    getAllCategories(){
        return this.category;
    }

    setTwelveFactorReport(val: ITwelveFactorReport[]){
        this.twelveFactorReport = val;
        console.log("this.twelveFactorReport"+this.twelveFactorReport);
    }
      
    getTwelveFactorReport(){
    return this.twelveFactorReport;
    }
}