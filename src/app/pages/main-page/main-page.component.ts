import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Character } from 'src/app/interface/interface';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  character: Character[] = []
  characterCopy: Character[] = []

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }

  filter(e: any): void {
    const search: string = e.target.value;
    this.character = this.characterCopy.filter(({ name }: Character) => {
      return name.toLowerCase().includes(search.toLowerCase())
    })
  }

  async getData() {
    await this.http.get<any>(`${environment.apiURL}/characters`)
      .subscribe(
        res => {
          this.character = res.map(({ char_id, name, nickname, img, status, occupation }: Character) => {
            return {
              char_id: char_id,
              name: name,
              nickname: nickname,
              img: img,
              status: status,
              occupation: occupation
            }
          })
          this.characterCopy = this.character
        },
        error => {
          console.log(error);
        }
      )
  }

}
