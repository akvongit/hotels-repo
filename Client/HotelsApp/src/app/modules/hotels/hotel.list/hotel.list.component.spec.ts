import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortService } from 'src/app/common/sorting/sortService';
import { HotelService } from 'src/app/services/hotelService';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { HotelListComponent } from './hotel.list.component';
import { of } from 'rxjs';


describe('Hotel Listing Component Test', () => {

    const mockData = [
        { "id": 1, "name": "Radisson Hotel", "price": 150.5, "description": "Radisson Hotel is a permium hotel", "location": "Delhi India", "rating": 4 },
        { "id": 2, "name": "Ritz Carlton", "price": 180,  "description": "Escape to long brunches and leisurely dinners at AG, the hotel’s modern bar and steakhouse.", "location": "Atlanta, GA - The Ritz-Carlton, Atlanta", "rating": 4.2 },
        { "id": 3, "name": "Residence Inn", "price": 85,  "description": "Residence Inn by Marriott Charlotte Uptown is conveniently located next to Bank of America Stadium, home of the Carolina Panthers and The Belk Bowl", "location": "404 S. Mint Street, Charlotte, North Carolina 28202 USA", "rating": 4.3 },
        { "id": 4, "name": "Kings Inn", "price": 45,  "description": "Three star hotel with 5 star features.", "location": "5 Kings Farm, Vaderahalli, Laxmipura Cross, Vidyaranyapura Post, Bengaluru, Karnataka 560097", "rating": 3.9 },
        { "id": 5, "name": "Fun and Family", "price": 55.6,  "description": "Get away for family.", "location": "344 karikkattukuzhiyil nadavayal, Panamaram, 67072", "rating": 2.8 }
    ];

    let component: HotelListComponent;
    let fixture: ComponentFixture<HotelListComponent>;
    
    beforeEach(async ()=>{
        TestBed.configureTestingModule({ 
            imports: [ HttpClientTestingModule ],
            providers: [
                            HotelService, 
                            SortService, 
                        ],
            declarations: [HotelListComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HotelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should Create Component', () => {
        expect(component).toBeTruthy();
    });

    it('Should Load Data on Initialize', ()=> {
        spyOn(component.hotelService, 'getHotels').and.returnValue(of(mockData));
        component.ngOnInit();
        expect(component.hotelService.getHotels).toHaveBeenCalled();
        expect(component.filteredHotelList).toEqual(mockData);
    });

    it('Should Filter Data on filter changed.', ()=> {
        spyOn(component.hotelService, 'getHotelsByCriteria').and.returnValue(of(mockData));
        component.ngOnInit();
        component.hotelListByNameFilter = 'a';
        component.ratingFilter = 2;
        expect(component.hotelService.getHotelsByCriteria).toHaveBeenCalledTimes(2);
        expect(component.filteredHotelList).toEqual(mockData);
    });

    it('Should Load Data and Default Sorted by Name', ()=> {
        spyOn(component.hotelService, 'getHotels').and.returnValue(of(mockData));
        component.ngOnInit();
        expect(component.hotelService.getHotels).toHaveBeenCalled();
        expect(component.filteredHotelList).toEqual(mockData);
        let sortedByName = component.isSortedByColumn('name', 'asc');
        expect(sortedByName).toBeTrue();
    });

    it('Should Toggle Sort Direction when sorted on same column', () => {
        spyOn(component.hotelService, 'getHotels').and.returnValue(of(mockData));
        component.ngOnInit();
        expect(component.hotelService.getHotels).toHaveBeenCalled();
        expect(component.filteredHotelList).toEqual(mockData);
        let sortByStatus = component.isSortedByColumn('name', 'asc');
        expect(sortByStatus).toBeTrue();
        component.sortByColumn('name');
        sortByStatus = component.isSortedByColumn('name', 'desc');
        expect(sortByStatus).toBeTrue();
    });

    it ('Should Sort on Only one Column - By latest sorted', ()=>{
        spyOn(component.hotelService, 'getHotels').and.returnValue(of(mockData));
        component.ngOnInit();
        expect(component.hotelService.getHotels).toHaveBeenCalled();
        expect(component.filteredHotelList).toEqual(mockData);
        let sortByStatus = component.isSortedByColumn('name', 'asc');
        expect(sortByStatus).toBeTrue();
        component.sortByColumn('price');
        sortByStatus = component.isSortedByColumn('name', 'asc');
        expect(sortByStatus).toBeFalse();
        sortByStatus = component.isSortedByColumn('name', 'desc');
        expect(sortByStatus).toBeFalse();
        sortByStatus = component.isSortedByColumn('price', 'asc');
        expect(sortByStatus).toBeTrue();
    });
});