import {Component, OnInit} from '@angular/core';
import {Sort} from '@angular/material';
import {HttpService} from './httpService';
import { Color} from './color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title = 'interactivityTest';
  colors: Color[] = [];


  sortedData: Color[];
  constructor (private httpService: HttpService) {
    this.sortedData = this.colors.slice();
  }

  sortData(sort: Sort) {
    const data = this.colors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a.colorName, b.colorName, isAsc);
    });
  }
  ngOnInit() {
    this.httpService.getColors().subscribe(data => {
      this.colors = data;
      this.sortedData = data;
  });
  }
}

function compare(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
