import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs';


export interface Dev {
  name: string;
  age: number;
  role: string;
  more: string;
  imgPath: string;
  linkedin: string;
  twitter: string;
  github: string;
  email: string;
}
export interface Company {
  name: string;
  more: string;
  imgPath: string;
  linkedin: string;
  twitter: string;
  github: string;
  email: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  developers: Dev[] = [
    { name: "Miles", age: 21, role: "fullstack", more: "Miles info", imgPath: "", linkedin: "https://www.linkedin.com", twitter: "https://www.twitter.com", github: "https://www.github.com", email: "miles@gmail.com" },
    { name: "Sam", age: 21, role: "fullstack", more: "Sam Info", imgPath: "", linkedin: "https://www.linkedin.com/in/samuel-boynton-79a69719a/", twitter: "https://www.twitter.com", github: "https://www.github.com", email: "samuelboynton1@gmail.com" }
  ]
  company: Company;
  currentInfo: string;
  currentDev: string;
  currentLinkedin: string;
  currentTwitter: string;
  currentGithub: string;
  currentEmail: string;
  selectedIndex: number;




  constructor() {
    this.company = {
      name: "Us", more: "We are an up and coming company excited for the future!", imgPath: "...", linkedin: "https://www.linkedin.com", twitter: "https://www.twitter.com", github: "https://www.github.com", email: "company@gmail.com"
    }
    this.currentInfo = this.company.more;
    this.currentDev = this.company.name;
    this.currentLinkedin = this.company.linkedin;
    this.currentTwitter = this.company.twitter;
    this.currentGithub = this.company.github;
    this.currentEmail = this.company.email;


  }

  ngOnInit(): void {
  }

  switchInfo(name: string) {
    if (name == "") {
      return;
    }
    for (let i = 0; i < this.developers.length; i++) {
      if (this.developers[i].name == name) {
        this.currentInfo = this.developers[i].more;
        this.currentDev = this.developers[i].name;
        this.currentLinkedin = this.developers[i].linkedin;
        this.currentTwitter = this.developers[i].twitter;
        this.currentGithub = this.developers[i].github;
        this.currentEmail = this.developers[i].email;
      }
    }
  }

  public setDev(_index: number, name: string) {
    if (this.selectedIndex === _index) {
      this.selectedIndex = -1;
      //show company data
      this.currentInfo = this.company.more;
      this.currentDev = this.company.name;
      this.currentLinkedin = this.company.linkedin;
      this.currentTwitter = this.company.twitter;
      this.currentGithub = this.company.github;
      this.currentEmail = this.company.email;
    } else {
      this.selectedIndex = _index;
      this.switchInfo(name);
    }

  }

}
