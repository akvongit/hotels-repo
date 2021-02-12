import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelService } from './hotelService';
import { environment } from 'src/environments/environment';

describe('Hotel Service Test', () => {
    let httpController: HttpTestingController;
    let hotelService: HotelService;

    const mockData = [
        { "id": 1, "name": "Radisson Hotel", "price": 150.5, "description": "Radisson Hotel is a permium hotel", "location": "Delhi India", "rating": 4 },
        { "id": 2, "name": "Ritz Carlton", "price": 180,  "description": "Escape to long brunches and leisurely dinners at AG, the hotel’s modern bar and steakhouse.", "location": "Atlanta, GA - The Ritz-Carlton, Atlanta", "rating": 4.2 },
        { "id": 3, "name": "Residence Inn", "price": 85,  "description": "Residence Inn by Marriott Charlotte Uptown is conveniently located next to Bank of America Stadium, home of the Carolina Panthers and The Belk Bowl", "location": "404 S. Mint Street, Charlotte, North Carolina 28202 USA", "rating": 4.3 },
        { "id": 4, "name": "Kings Inn", "price": 45,  "description": "Three star hotel with 5 star features.", "location": "5 Kings Farm, Vaderahalli, Laxmipura Cross, Vidyaranyapura Post, Bengaluru, Karnataka 560097", "rating": 3.9 },
        { "id": 5, "name": "Fun and Family", "price": 55.6,  "description": "Get away for family.", "location": "344 karikkattukuzhiyil nadavayal, Panamaram, 67072", "rating": 2.8 }
    ];

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [ HotelService ],
            imports: [ HttpClientTestingModule ]
        });

        httpController = TestBed.inject(HttpTestingController);
        hotelService = TestBed.inject(HotelService);
    });

    it('Get All Hotels Should return data.', () =>{
        hotelService.getHotels().subscribe(data => {
            expect(data.length).toEqual(mockData.length);
            expect(data).toEqual(mockData);
        });

        const request = httpController.expectOne(environment.hotelServiceBaseUrl + 'hotels');
        expect(request.request.method).toEqual('GET');
        request.flush(mockData); 
    });

    it ('Get Filtered Hotels should return data.', ()=>{
        hotelService.getHotelsByCriteria({name:'someName'}).subscribe(data => {
            expect(data.length).toEqual(mockData.length);
            expect(data).toEqual(mockData);
        });

        const request = httpController.expectOne(environment.hotelServiceBaseUrl + 'search');
        expect(request.request.method).toEqual('POST');
        expect(request.request.body).toEqual({name:'someName'});
        request.flush(mockData); 
    });
});