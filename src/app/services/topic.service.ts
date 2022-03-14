import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  //GET APIs

  public getTopics(): Observable<Topic> {
    let url = `${baseUrl}/topics/`;
    return this.http.get<Topic>(url);
  }

  //CREATE APIs

  public addTopic(newTopic: Topic) {
    let topic: Topic = {
      id: 0,
      title: '',
      description: '',
      subjectId: 0,
      enabled: true
    }

    topic.title = newTopic.title;
    topic.description = newTopic.description;
    topic.subjectId = newTopic.subjectId;
    topic.enabled = newTopic.enabled;

    let url = `${baseUrl}/topics/`;

    return this.http.post<Topic>(url, topic);

  }

  //UPDATE APIs

  public updateTopic(editTopic: Topic, id: number) {
    let url = `${baseUrl}/topics/${id}`;
    return this.http.put<boolean>(url, editTopic);
  }

  public toggleTopicState(toggledTopic: Topic, id: number) {
    return this.updateTopic(toggledTopic, id);
  }

  //DELETE APIs

  public deleteTopic(id: number) {
    let url = `${baseUrl}/topics/${id}`;
    return this.http.delete<boolean>(url);
  }

}
