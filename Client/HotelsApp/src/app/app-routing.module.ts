import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListComponent } from './modules/hotels/hotel.list/hotel.list.component';

const routes: Routes = [
  { path: 'home', component: HotelListComponent },
  { path: '', component: HotelListComponent, pathMatch: 'full' },
  { path: '**', component: HotelListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
