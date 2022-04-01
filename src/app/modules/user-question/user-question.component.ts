import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';
import { MatDialog } from '@angular/material/dialog';
import { QuizSubmitConfirmDialogComponent } from './quiz-submit-confirm-dialog/quiz-submit-confirm-dialog.component';
import { TimerService } from 'src/app/services/timer.service';
import { TrackerService } from 'src/app/services/tracker.service';
import { Subscription } from 'rxjs';
import { UserAttemptedQuiz } from 'src/app/models/user-attempted-quiz';
import { AttemptedQuiz } from 'src/app/models/attempted-quiz';
import { AttemptedQuizQuestion } from 'src/app/models/attempted-quiz-question';
import { LoginService } from 'src/app/services/login.service';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit, OnDestroy {

  @Input() questions: Question[] = [];
  @Input() quizMetaData: any;
  submitted: boolean = false;

  currentQuestion: Question;

  attemptedQuestions: Question[] = [];
  questionAnswered: any[] = [];

  totalQuestions: number = 0;
  currentQuesNumber: number = 0;
  lastQuestion: boolean = false;
  firstQuestion: boolean = true;

  currentSelectedOptionId: number = -1;

  activeQuestion: Question;

  userQuizTimeTaken: number = -1;

  timerSubscription: Subscription;
  trackerSubscription: Subscription;
  quizSubmitTimeSubscription: Subscription;


  constructor(
    public dialog: MatDialog, 
    private timerService: TimerService, 
    private trackerService: TrackerService,
    private loginService: LoginService,
    private usrQuizService: UserquizService
    ) { }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    this.currentQuesNumber = 0;
    this.firstQuestion = true;
    if(this.totalQuestions === 1) {
      this.lastQuestion = true;
    }
    this.populateQuestion(0);
    this.timerSubscription = this.timerService.receiveTimeUpEvent().subscribe(resp => {
      this.onTimeComplete();
    })

    this.trackerSubscription = this.trackerService.receiveFinishTestEvent().subscribe(resp => {
      if(resp){
        this.onSubmitConfirmDialog();
      }
    })

    this.quizSubmitTimeSubscription = this.timerService.receiveQuizSubmitTimeEvent().subscribe(resp => {
      if(resp) {
        this.userQuizTimeTaken = resp;
        // console.log(this.userQuizTimeTaken)
        this.quizSubmitTimeSubscription.unsubscribe();
      }
    })
  }

  nextQues(){
    this.firstQuestion = false;
    this.currentQuesNumber++;
    this.populateQuestion(this.currentQuesNumber);
    if(this.currentQuesNumber === (this.totalQuestions - 1)) {
      this.lastQuestion = true;
    }
    this.saveMarkedQuestion();
  }

  previousQues() {
    this.lastQuestion = false;
    this.currentQuesNumber--;
    this.populateQuestion(this.currentQuesNumber);
    if(this.currentQuesNumber === 0){
      this.firstQuestion = true;
    }
    this.saveMarkedQuestion();
  }

  populateQuestion(quesIndex: number) {
    this.currentQuestion = Object.assign({}, this.questions[quesIndex]);
  }

  onOptionSelect() {
    let currQues = this.questions[this.currentQuesNumber];
    let usrAns = currQues.questionChoices.find(ch => ch.id === this.currentSelectedOptionId)?.description
    let alreadyAnswered = this.questionAnswered.find(q => q.quesId === currQues.id);
    if(alreadyAnswered){
      let index = this.questionAnswered.findIndex(q => q.quesId === alreadyAnswered.quesId);
      this.questionAnswered[index].ansMarked = this.currentSelectedOptionId;
      this.questionAnswered[index].ans = usrAns;
    }else {
      this.questionAnswered.push({
        quesId: currQues.id,
        quesContent: currQues.content,
        ansMarked: this.currentSelectedOptionId,
        ans: usrAns
      })
    }
  }

  onSubmitConfirmDialog() {
    this.openConfirmDialog();
  }

  saveMarkedQuestion() {
    if(this.questionAnswered.length < 1){
      this.currentSelectedOptionId = -1;
    }else {
      const ques = this.findMarkedQues();
      if(ques){
        this.currentSelectedOptionId = ques.ansMarked;
      }else {
        this.currentSelectedOptionId = -1;
      }
    }
  }

  findMarkedQues() {
    const currQuesId = this.questions[this.currentQuesNumber].id;
    const ques = this.questionAnswered.find(q => q.quesId === currQuesId);
    return ques;
  }

  submitQuiz(timeLeft: number) {
    this.submitted = true;
    // Prepare Data
    let submittedQuestions: AttemptedQuizQuestion[] = [];

    this.questionAnswered.forEach(ques => {
      submittedQuestions.push({
        id: ques.quesId,
        question: ques.quesContent,
        optionSelected: ques.ans
      })
    })

    let attemptedQuiz: AttemptedQuiz = {
      id: this.quizMetaData.id,
      title: this.quizMetaData.title,
      description: this.quizMetaData.description,
      questions: submittedQuestions
    }

    let userData = this.loginService.getUser();

    let payload: UserAttemptedQuiz = {
      id: -1,
      userId : userData.userId,
      userFullName: `${userData.firstName} ${userData.lastName}`,
      username: userData.username,
      attemptedOn: new Date(),
      proficiencyId: this.quizMetaData.proficiencyId,
      maxMarks: this.quizMetaData.maxMarks,
      maxTime: this.quizMetaData.maxTime,
      userTime: this.userQuizTimeTaken,
      score: -1,
      quiz: attemptedQuiz
    }

    this.usrQuizService.submitQuiz(payload).subscribe(resp =>{
      // console.log(resp);
      this.usrQuizService.broadcastScoreGeneratedEvent(resp);
    });

  }

  openConfirmDialog(): void {

    let dialogRef = this.dialog.open(QuizSubmitConfirmDialogComponent, {
      width: '330px',
      height: '190px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usrQuizService.broadcastQuizSubmitEvent();
        this.submitQuiz(0);
      }
    });
  }

  onTimeComplete() {
    // console.log('Time Completed.Quiz Auto Submit: ')
    this.submitQuiz(0);
  }

  unmarkCurrentQuestion() {
    const quesToUnmark = this.findMarkedQues();
    this.questionAnswered = [...this.questionAnswered.filter(q => q.quesId != quesToUnmark.quesId)];
    this.currentSelectedOptionId = -1;
  }

  ngOnDestroy(): void {
      this.timerSubscription.unsubscribe();
      this.trackerSubscription.unsubscribe();
      this.quizSubmitTimeSubscription.unsubscribe();
  }

}
