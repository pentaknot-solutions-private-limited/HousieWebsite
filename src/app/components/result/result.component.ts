import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // items = ['1', '2', '3'];
  items = [
    {'title': 'Top', 'winner': 'C. Ronaldo'},
    {'title': 'Middle', 'winner': 'L. Messi'},
    {'title': 'Bottom', 'winner': 'G. Bale'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
