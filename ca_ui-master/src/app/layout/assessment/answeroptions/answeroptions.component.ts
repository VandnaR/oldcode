import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-answeroptions',
  templateUrl: './answeroptions.component.html',
  styleUrls: ['./answeroptions.component.scss']
})
export class AnsweroptionsComponent implements OnInit {

  constructor() {}

  @Input() question;
  @Input() answerOptions;
  @Input() questionsList;
  @Input() answersMapByQID;

  ngOnInit() {
    
  }

}
