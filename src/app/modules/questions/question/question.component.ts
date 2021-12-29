import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { Proficiency } from 'src/app/models/proficiency';
import { Question } from 'src/app/models/question';
import { QuestionChoice } from 'src/app/models/questionchoice';
import { Topic } from 'src/app/models/topic';
import { QuestionService } from 'src/app/services/question.service';
import { TopicService } from 'src/app/services/topic.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  public data: string = '<p>Enter question content here</p>';

  question: Question = {
    id: -1,
    content: '',
    topicId: -1,
    enabled: true,
    proficiencyId: 1,
    questionChoices:[]
  }

  proficiencyList: Proficiency[] = [];
  topicsList: Topic[] = [];

  questionChoices: QuestionChoice[] = [
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0},
    {id: 0, description: '', enabled: true, correct: false, questionId: 0}
  ];

  editableQuestion: Question;
  addQuestion: boolean = false;
  dataLoaded: boolean = false;

  selectedQuestionId: number = -1;

  constructor(private questionService: QuestionService, private topicService: TopicService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProficiencies();
    // this.topicsList.length = 0;
    // this.topicService.getTopics().subscribe(
    //   (data: any) => {
    //     data.forEach((d: Topic) => {
    //       if(d.enabled){
    //         this.topicsList.push(Object.assign({}, d));
    //       }
    //     });
    //   },
    //   (error)=>{
    //     // this._snackBar.open('Error while fetching topics list','',{
    //     //   duration: 3000
    //     // });
    //     console.log(error);
    //   }
    // );
    if(this.router.url.includes('/new')){
      this.addQuestion = true;
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedQuestionId = id;
          // this.getUserByUserId(id);
        }
      })
    }
  }

  getProficiencies(){
    this.proficiencyList = [
      {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
    ]
  }

  


  createQuestion(){
    this.question.questionChoices = this.questionChoices.filter(ch => ch.description);
    this.question.proficiencyId = 2;
    this.questionService.addQuestion(this.question).subscribe(
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
