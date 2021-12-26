import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Proficiency } from 'src/app/models/proficiency';
import { Question } from 'src/app/models/question';
import { QuestionChoice } from 'src/app/models/questionchoice';
import { Topic } from 'src/app/models/topic';
import { QuestionService } from 'src/app/services/question.service';
import { TopicService } from 'src/app/services/topic.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  newQuestionData: Question = {
    id: 0,
    title: '',
    description: '',
    topicId: 0,
    enabled: true,
    proficiencyId: 0,
    questionChoices:[]
  }

  proficiencyList: Proficiency[] = [];
  topicsList: Topic[] = [];

  newQuestionChoices: QuestionChoice[] = [
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0}
  ];

  constructor(private questionService: QuestionService, private topicService: TopicService) { }

  ngOnInit() {
    this.getProficiencies();
    this.topicsList.length = 0;
    this.topicService.getTopics().subscribe(
      (data: any) => {
        data.forEach((d: Topic) => {
          if(d.enabled){
            this.topicsList.push(Object.assign({}, d));
          }
        });
      },
      (error)=>{
        // this._snackBar.open('Error while fetching topics list','',{
        //   duration: 3000
        // });
        console.log(error);
      }
    );
  }

  getProficiencies(){
    this.proficiencyList = [
      {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
    ]
  }

  


  createQuestion(){
    this.newQuestionData.questionChoices = this.newQuestionChoices.filter(ch => ch.description);
    this.newQuestionData.proficiencyId = 2;
    this.questionService.addQuestion(this.newQuestionData).subscribe(
      (data)=>{
        // this.questions.push(data);
        // this._snackBar.open(`${this.newQuestionData.title} is added successfully to list`,'',{
        //   duration: 3000
        // });

        // this.freshForm();
      },
      (error)=>{
        // this._snackBar.open(JSON.stringify(error),'',{
        //   duration: 3000
        // });
      }
    )
  }

  getTopicName(topicId: number) {
    return this.topicsList.find(t => t.id === topicId)?.title;
  }

}
