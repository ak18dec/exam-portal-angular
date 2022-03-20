import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';

@Component({
  selector: 'app-quiz-certificate',
  templateUrl: './quiz-certificate.component.html',
  styleUrls: ['./quiz-certificate.component.scss']
})
export class QuizCertificateComponent implements OnInit {

  id: string;

  constructor(private certificateService: CertificateService) { }

  ngOnInit(): void {
  }

}
