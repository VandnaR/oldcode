import { Component, OnInit, Input, DoCheck , ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { config } from '../../../../../assets/config/configuration';

import { AssessmentService } from '../../assessment.service';
 
import { ISurveyResponseQBean } from '../../../../entities/SurveyResponseQBean'; 
import { ISurveyResponseAnswersBean } from '../../../../entities/SurveyResponseAnswersBean'; 

@Component({
  selector: 'app-multiselect-checkbox',
  templateUrl: './multiselect-checkbox.component.html',
  styleUrls: ['./multiselect-checkbox.component.scss']
})
export class MultiselectCheckboxComponent implements OnInit {

  constructor(private modalService: NgbModal,private http:HttpClient,private assessmentService: AssessmentService ) { }
  
  //properties
  @Input() answersoptions;
  @Input() queslist;
  @Input() ansMap;

  //@ViewChild('chkInput') chkInput:ELementRef;

  ansArr;  
  quesId;
  srQid;  
  questobeShown;
  ansOptionsId;
  surveyResponseId;
  surveyResponseQid;

  indexToBeDeleted:number;
  quesExist :boolean;
  ERPFlag=false;

  username = localStorage.getItem('username');

  closeResult: string;  

  ngOnInit() {
      //this.ansArr=this.assessmentService.getAnsArr();            
  }

  
  getAnswersArr(){
      return this.assessmentService.getAnsArr();
  }
  
    open(content,answerOptionsId: number,e,no :number) {        
        if(answerOptionsId === 8 && !e.target.checked)
        {
            localStorage.setItem('yesOption','selectedfalse');
            this.assessmentService.ERP=0;
            this.assessmentService.hiddenCategory=[];
            this.ERPFlag=true;
        }
        else if(answerOptionsId === 8 && e.target.checked){ 
            localStorage.setItem('yesOption','selectedtrue');
            this.assessmentService.ERP=8;
            this.assessmentService.hiddenCategory=['UI Layer','OS Layer','App Runtime','Business Logic Layer','Data Storage','DevOps','12 Factor Compatibility'];
            this.ERPFlag=false;            
        }

        //alert(answerOptionsId);                        
        this.surveyResponseId=+localStorage.getItem('surveyResponseId');

        if(+answerOptionsId === 111 && e.target.checked)
        {
            //this.assessmentService.hiddenQuesId=[];
            this.assessmentService.hiddenQuesId.splice(this.assessmentService.hiddenQuesId.indexOf(29),1);
            this.assessmentService.hiddenQuesId.splice(this.assessmentService.hiddenQuesId.indexOf(30),1);
        }
        else if(+answerOptionsId === 111 && !e.target.checked){
            /*this.assessmentService.hiddenQuesId.splice(1, 0, 29);
            this.assessmentService.hiddenQuesId.splice(2, 0, 30);*/
            this.assessmentService.hiddenQuesId.push(29);
            this.assessmentService.hiddenQuesId.push(30);
        }
        //if question is of non pop-up type
        if(+no === 1)
        {
            this.quesId=this.answersoptions[0].questionId;
        }
        //if question is of pop-up type
        else{
            this.quesId=this.questobeShown.questionId;
            //alert(this.quesId);
        }

        // if child is multiselect type
        if(no===2 || no ===1){
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
                            //alert("yes");
                            break;                    
                        }
                    }
                    //alert("SrQid is "+this.srQid);

                    //find the indexToBeDeleted to delete for the current answerOptionsId the same in service
                    for(let i=0;i<surveyResponseAnswer.length;i++)
                    {
                        
                        if(surveyResponseAnswer[i].id.answerOptionsId === answerOptionsId){                        
                            this.indexToBeDeleted=i;//index to delete
                            break;
                        }
                    }
                    //alert("SrOpId is "+this.ansOptionsId);
                                        
            }                                 
            if(this.quesExist)
            {
                //if checked then just insert the new selection to the server
                if(e.target.checked)
                {
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
                            this.assessmentService.addSurveyResponseAnswer(res.surveyResponseAnswer);    
                            //this.assessmentService.addAnsArr(res.surveyResponseAnswer.answerOption);              
                        },
                        err => {
                        console.log(err);
                        }
                    ); 
                }
                else
                {
                    //deleting the surveyResponseAnswer table using the composite key
                    //alert(this.srQid +" "+answerOptionsId);
                    this.http.delete(config.url+'surveyResponseAnswer/'+this.srQid+'/'+answerOptionsId)
                    .subscribe(
                        data => {
                            console.log(data);
                        },
                        error =>{
                                console.log(error);
                                //alert('Deleted'); 
                                this.assessmentService.deleteSurveyResponseAnswer(this.indexToBeDeleted);
                                //console.log(this.assessmentService.getSurveyResponseAnswer());                       
                            }
                    )
                }
                this.quesExist=false;
            }
            else if (!this.ERPFlag)
            {                
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
            if(answerOptionsId != 111)
            {
                for(let val of this.queslist){            
                    if(val.dependsOnAnswerSelection === answerOptionsId && e.target.checked)
                    {        
                        this.questobeShown=val;
                        this.modalService.open(content).result.then((result) => {
                        this.closeResult = `Closed with: ${result}`;
                        }, (reason) => {
                            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                        });
                    }
                }
            }
        }
        //child is single select type
        else if(no===3){
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
                                        console.log(this.ansOptionsId);
                                        this.assessmentService.addSurveyResponseAnswer(res.surveyResponseAnswer);             
                                        this.assessmentService.removeAnswerArr(this.ansOptionsId);
                                        this.assessmentService.addAnsArr(+res.surveyResponseAnswer.id.answerOptionsId);
                                        console.log(this.assessmentService.getAnsArr());
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


    checkIfChildExist(answerOptionsId){              
        for(let val of this.queslist){            
                if(val.dependsOnAnswerSelection === answerOptionsId
                 && this.getAnswersArr().includes(answerOptionsId)
                 && answerOptionsId!=111)
                {                            
                    return true;
                }
        }
        return false;
    }

    showChildQuestions(content,answerOptionsId,e,no){
        if(answerOptionsId != 111)
        {
            for(let val of this.queslist){            
                if(val.dependsOnAnswerSelection === answerOptionsId)
                {        
                    this.questobeShown=val;
                    this.modalService.open(content).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                    }, (reason) => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    });
                }
            }
        }
    }


}
