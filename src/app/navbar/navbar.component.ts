import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToLink(url: string) {
    window.open(url, '_blank');
    //onclick="window.open(`https://drive.google.com/file/d/1pzn2jQN0PRXcG1xBKcoywyBPRv_GEjPv/view?usp=sharing`)"
  }
}
