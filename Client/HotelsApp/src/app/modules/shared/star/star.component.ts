import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'rating-star',
    templateUrl: './star.html',
    styleUrls: ['./star.css']
})
export class StarComponent implements OnChanges {
  
    private _rating!: number;
  
    @Input() set rating(val: number){
      if (val > this.maxSupportedStars) {
        throw new Error(`Specified Star Rating: ${val} cannot be more than Max Supported Rating: ${this.maxSupportedStars}`);
      }
      this._rating = val;
    }

    get rating() : number {
      return this._rating;
    }

    private _maxSupportedStars: number = 5;
    
    @Input() set maxSupportedStars(val: number){
      if (!val || val < 1 || val > 10) {
        throw new Error(`Minumum 1 star is supported. Set Max Supported Star to 1 to 10.`);
      }
      this._maxSupportedStars = val;
    }

    get maxSupportedStars(): number {
      return this._maxSupportedStars;
    }
    
    maxStarItems(): Array<number> {
      return Array<number>(this._maxSupportedStars);
    }

    private _starWidthFactor = 65;
    
    private _starWidth!: number;

    

    get starWidth(): number {
      return this._starWidth;
    }

    get starWidthFactor(): number {
      return this._starWidthFactor;
    }
    
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  
    ngOnChanges(): void {
      this._starWidth = this.rating * this._starWidthFactor / this.maxSupportedStars;
    }
}