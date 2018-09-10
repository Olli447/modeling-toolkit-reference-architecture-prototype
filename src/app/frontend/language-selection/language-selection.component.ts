import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
    breakpoint: number;

  constructor() { }

    ngOnInit() {
        this.breakpoint = this.calcColums(window.innerWidth);
    }

    onResize(event) {
        this.breakpoint = this.calcColums(event.target.innerWidth);
    }

    calcColums(width: number) {
      if (width <= 1000) {
          return 1;
      } else if (1000 < width && width <= 1500) {
          return 3;
      } else {
          return 6;
      }
    }
}
