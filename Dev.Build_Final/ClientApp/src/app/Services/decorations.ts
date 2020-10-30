import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { decoration } from "../interfaces/Idecoration";

@Injectable({
  providedIn: 'root'
})

export class decorationService {
  constructor(private http: HttpClient) { }

  decorationUrl = 'api/decoration';


  getDecorations() {
    return this.http.get(`${this.decorationUrl}`);
  }

  toggleDone(item: decoration) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(item);
    var newURL = this.decorationUrl + '/check'
    return this.http.post<decoration>(newURL, body, { 'headers': headers }).subscribe((data) => console.log(data));
  }

  newDecorationItem(newDecoration: decoration) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(newDecoration);
    var newURL = this.decorationUrl + '/add'
    console.log(body)
    return this.http.post<decoration>(newURL, body, { 'headers': headers }).subscribe((data) => console.log(data));
  }

  removeDecorationItem(removeDecoration: decoration) {
    var newURL = this.decorationUrl + `/remove/${removeDecoration.description}`
    return this.http.delete<decoration>(newURL).subscribe((data) => console.log(data));;
  }


}
