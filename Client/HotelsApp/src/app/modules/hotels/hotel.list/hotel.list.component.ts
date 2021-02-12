import { Component, OnInit } from '@angular/core'
import { HotelService } from 'src/app/services/hotelService';
import { IHotel } from 'src/app/data/hotel';
import { IHotelSearchCriteria } from 'src/app/data/hotelCriteria';
import { SortService } from 'src/app/common/sorting/sortService';
import { sortOrder } from 'src/app/common/sorting/sorter';

@Component({
    selector: 'hotel-list',
    templateUrl: './hotel.list.html',
    styleUrls: ['./hotel.list.css' ],
    providers: [SortService]
})
export class HotelListComponent implements OnInit {

    hotelList: IHotel[] = [];
    filteredHotelList: IHotel[] = [];
    pageTitle: string = 'Hotels List';
    errorMessage: string = '';

    constructor(public hotelService: HotelService, private sortService: SortService) {}
    
    ngOnInit(): void {
        this.hotelService.getHotels().subscribe({
            next: data =>  { 
              this.setHotelsData(data); 
              this.sortByColumn('name');  
            },
            error: err => console.log(err)
        });
    }

    _hotelListByNameFilter!: string;
    get hotelListByNameFilter(): string {
      return this._hotelListByNameFilter;
    }
    set hotelListByNameFilter(value: string) {
      this._hotelListByNameFilter = value;
      this.performFilter();
    }

    _ratingFilter!: number;
    get ratingFilter(): number {
      return this._ratingFilter;
    }
    set ratingFilter(value: number) {
      this._ratingFilter = value;
      this.performFilter();
    }

    private setHotelsData(data: IHotel[]){
        this.hotelList = data;
        this.setFilteredHotelsData(data);
    }

    private setFilteredHotelsData(data: IHotel[]){
        this.filteredHotelList = data;
        this.sortService.dataList = this.filteredHotelList;
    }

    private performFilter(){
        const criteria: IHotelSearchCriteria = {
            rating: this.ratingFilter && this.ratingFilter > 0 ? this.ratingFilter : null,
            name: this.hotelListByNameFilter  
        }

        // User Server side filtering //
        this.hotelService.getHotelsByCriteria(criteria).subscribe({
          next : data => this.setFilteredHotelsData(data),
          error: err => console.log(err)
        });
    }

    sortByColumn(column: string) {
      if (!column || column.length === 0) {
        return;
      }

      this.sortService.sortData(column);
    }

    isSortedByColumn(col: string, order: string): boolean {
      return this.sortService && this.sortService.isSortingByColumn(col, order);
    }
}