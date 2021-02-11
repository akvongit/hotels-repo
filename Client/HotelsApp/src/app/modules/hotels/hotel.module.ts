import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HotelService } from 'src/app/services/hotelService'
import { SharedModule } from '../shared/shared.module'

import { HotelListComponent } from './hotel.list/hotel.list.component'

@NgModule({
    declarations: [ HotelListComponent ],
    imports: [ 
        SharedModule, 
        FormsModule,
        RouterModule,
        CommonModule,
    ],
    providers: [HotelService],
    exports: [ HotelListComponent ]
})
export class HotelModule {}