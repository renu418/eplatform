import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EportalService {

  constructor(private http: HttpClient) { }




  getService() {
    return this.http.get("http://api.myjson.com/bins/1227ck");
  }

  fileAndData(data) {
    return this.http.post("http://192.168.99.100:31022/getvalue", data);
    // return this.http.post("http://0.0.0.0:5031/getvalue", data);
  }
  showcontent(file) {
    return this.http.post("http://192.168.99.100:31022/getfile", file);
  }
  getURL(lang) {
    return this.http.post("http://192.168.99.100:31022/get", lang);
    // return this.http.get("http://backend-server.com:5031/get/python");
  }

  getQuestions() {
    return this.http.get("http://192.168.99.100:31022/getData");
  }

  validateEmail(userData) {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post("http://192.168.99.100:31022/emailValidation", userData);
  }

  testing(){
    return this.http.get("http://192.168.99.100:30881/testing");
  }

  userDataInsert(Data)
  {
    return this.http.post("http://192.168.99.100:31022/userDataInsert",Data);
  }

}
