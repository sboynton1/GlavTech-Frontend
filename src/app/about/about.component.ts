import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  display:string

  constructor(private profileComponent: ProfileComponent) { }

  ngOnInit(): void {
    this.getCurrentInfo("");
  }
  getCurrentInfo(name:string) {
    console.log("before: ", this.display)
    this.profileComponent.switchInfo(name);
    this.display = this.profileComponent.currentInfo;
    console.log("after: ", this.display)

  } 
  
}
