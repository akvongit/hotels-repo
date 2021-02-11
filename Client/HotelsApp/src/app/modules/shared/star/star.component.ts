import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'rating-star',
    templateUrl: './star.html',
    styleUrls: ['./star.css']
})
export class StarComponent implements OnChanges {
    @Input() rating!: number;
    starWidth!: number;
    @Output() ratingClicked: EventEmitter<string> =
      new EventEmitter<string>();
  
    ngOnChanges(): void {
      this.starWidth = this.rating * 65 / 5;
    }
}