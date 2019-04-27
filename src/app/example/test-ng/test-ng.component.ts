import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'practise',
  templateUrl: './test-ng.component.html',
  styleUrls: ['./test-ng.component.css']
})
export class TestNgComponent implements OnInit {
  viewMode = 'map';

  constructor() { }

  ngOnInit() {
  }

}
