import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EportalService {

  constructor(private http: HttpClient) { }

  changeGottyFiles(payload){
    return this.http.post("http://192.168.99.100:31022/changeGottyFiles",payload)
  }
  
  fileAndData(data) {
    // return this.http.post("http://192.168.99.100:31022/getvalue", data);
    return this.http.post("http://192.168.99.100:31022/getvalue", data);
  }
  
  showcontent(file) {
    return this.http.post("http://192.168.99.100:31022/getfile", file);
  }
  
  getURL(lang) {
    return this.http.post("http://192.168.99.100:31022/get", lang);
  }

  getQuestions() {
    return this.http.get("http://192.168.99.100:31022/getData");
  }

  validateEmail(userData) {
    return this.http.post("http://192.168.99.100:31022/emailValidation", userData);
  }

  testing(){
    return this.http.get("http://192.168.99.100:30881/testing");
  }

  userDataInsert(Data)
  {
    return this.http.post("http://192.168.99.100:31022/userDataInsert",Data);
  }
  
  sendMail(Data)
  {
    return this.http.post("http://192.168.99.100:31022/sendEmail",Data);
  }
}
