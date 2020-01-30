import { Component, OnInit, Input ,EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { AssessmentService } from '../../assessment.service';
import { ISurveyResponseQBean } from '../../../../entities/SurveyResponseQBean'; 
import { ISurveyResponseAnswersBean } from '../../../../entities/SurveyResponseAnswersBean'; 


import { config } from '../../../../../assets/config/configuration';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit {

    constructor(private modalService: NgbModal,private http:HttpClient,private assessmentService: AssessmentService) { }

    //properties
    @Input() answersoptions;
    @Input() queslist;
    @Input() ansMap;

    ansArr;    
    quesId;
    srQid;
    ansOptionsId;
    questobeShown;
    surveyResponseId;
    surveyResponseQid;
    indexToBeDeleted:number;
    quesExist :boolean;

    username = localStorage.getItem('username');    

    closeResult: string;

    ngOnInit() {      
        //this.ansArr=this.assessmentService.getAnsArr();      
    }

    getAnswersArr(){
        return this.assessmentService.getAnsArr();
    }

    open(content,answerOptionsId: number,no:number) {       
            //this.selectedAnswerOptionsId=answerOptionsId;
            //alert(this.selectedAnswerOptionsId);
            //getting locally stored surveyResponseId from localStorage
            this.surveyResponseId=+localStorage.getItem('surveyResponseId');            
            for(let val of this.queslist){                          
                if(+val.dependsOnAnswerSelection === +answerOptionsId)
                {                                
                    this.assessmentService.hiddenQuesId.splice(this.assessmentService.hiddenQuesId.indexOf(val.questionId),1);
                }
            }

            /*if(+answerOptionsId === 66)
            {
               this.assessmentService.hiddenQuesId.splice(this.assessmentService.hiddenQuesId.indexOf(18),1);               
            }
            else if(+answerOptionsId === 67 ||+answerOptionsId === 68 || +answerOptionsId === 69 || +answerOptionsId === 0){
                this.assessmentService.hiddenQuesId.push(18);
            }

            if(+answerOptionsId === 70){

            }*/
            //if question is of non pop-up type
            if(+no===1)
            {
                this.quesId=this.answersoptions[0].questionId;
            }
            //if question is of pop-up type
            else{
                this.quesId=this.questobeShown.questionId;
            }
            
            //Checking if questionId exist for the given surveyResponseId  
            if(this.assessmentService.getSurveyResponseQ().length!=0 && this.assessmentService.getSurveyResponseAnswer().length!=0)
            {
                let surveyResposeQ=this.assessmentService.getSurveyResponseQ();
                let surveyResponseAnswer=this.assessmentService.getSurveyResponseAnswer();

                //Looping through surveyResposeQ of assessment service to find whether current question is already attempted or not
                for(let val of surveyResposeQ)
                {               
                    if(val.questionId === this.quesId){                    
                        this.srQid=val.surveyResponseQid;
                        this.quesExist=true;
                        break;                    
                    }
                }
                //alert("SrQid is "+this.srQid);

            //find the indexToBeDeleted to delete for the current answerOptionsId the same in service
                for(let i=0;i<surveyResponseAnswer.length;i++)
                {
                    
                    if(surveyResponseAnswer[i].id.surveyResponseQid === this.srQid){
                        this.ansOptionsId=surveyResponseAnswer[i].id.answerOptionsId;
                        this.indexToBeDeleted=i;
                        break;
                    }
                }
                //alert("SrOpId is "+this.ansOptionsId);            
            
            }             
                    
        if(this.quesExist){
                //deleting the aurveyResponseAnswer table using the composite key
                this.http.delete(config.url+'/surveyResponseAnswer/'+this.srQid+'/'+this.ansOptionsId)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error =>{
                            console.log(error);
                            if(error.status==200) //status OK
                            {
                                this.assessmentService.deleteSurveyResponseAnswer(this.indexToBeDeleted);
                                console.log(this.assessmentService.getSurveyResponseAnswer());
                                //saving the changed option with the surveyResponseQid
                                this.http.post<ISurveyResponseAnswersBean>(config.url+'surveyResponseAnswer/',
                                {
                                    "id": {                             
                                            "surveyResponseQid": this.srQid,
                                            "answerOptionsId": +answerOptionsId
                                            },
                                            "surveyResponseId": this.surveyResponseId                        
                                })
                                .subscribe(
                                    res => {
                                        console.log(res);                
                                        this.assessmentService.addSurveyResponseAnswer(res.surveyResponseAnswer);             //this.assessmentService.addAnsArr(res.surveyResponseAnswer.answerOption); 
                                    },
                                    err => {
                                    console.log(err);
                                    }
                                ); 
                            }

                        }
                );
                this.quesExist=false;
        }
        else{
                //saving the survey_response_q table data
                this.http.post<ISurveyResponseQBean>(config.url+'surveyResponseQ/',
                {
                    "surveyResponseId": this.surveyResponseId,
                    "questionId": this.quesId
                })
                .subscribe(
                    res => {                      
                        console.log(res);
                        this.surveyResponseQid=res.surveyResponseQ.surveyResponseQid;
                        this.assessmentService.addSurveyResponseQ(res.surveyResponseQ);
                        console.log(this.assessmentService.getSurveyResponseQ());
                        //saving the survey_response_answers table data
                        this.http.post<ISurveyResponseAnswersBean>(config.url+'surveyResponseAnswer/',
                        {
                            "id": {                             
                                    "surveyResponseQid": this.surveyResponseQid,
                                    "answerOptionsId": +answerOptionsId
                                    },
                                    "surveyResponseId": this.surveyResponseId                        
                        })
                        .subscribe(
                            res => {
                                console.log(res);
                                this.assessmentService.addSurveyResponseAnswer(res.surveyResponseAnswer);
                                //this.assessmentService.addAnsArr(res.surveyResponseAnswer.answerOption);                 
                                console.log(this.assessmentService.getSurveyResponseAnswer());
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
            //opening child questions in pop outs
            for(let val of this.queslist){            
                if(val.dependsOnAnswerSelection === +answerOptionsId && val.questionType ==="POPOUT")
                {                  
                    this.questobeShown=val;
                    // console.log(this.questobeShown.question);
                    this.modalService.open(content).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                    }, (reason) => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    });
                }           
            }
            
        }

        private getDismissReason(reason: any): string {
            if (reason === ModalDismissReasons.ESC) {
                return 'by pressing ESC';
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                return 'by clicking on a backdrop';
            } else {
                return  `with: ${reason}`;
            }
        }
        
        onChange(value){
            console.log(value);
        }

}
