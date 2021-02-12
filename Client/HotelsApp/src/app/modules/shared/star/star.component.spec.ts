import { compileComponentFromMetadata, compileNgModule } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarComponent } from './star.component';

describe('Star Component Test', () => {
    let component: StarComponent;
    let fixture: ComponentFixture<StarComponent>;

    beforeEach(async ()=>{
        TestBed.configureTestingModule({ declarations: [] }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should Create Component', () => {
        expect(component).toBeTruthy();
    });

    it('Should Show Render Correct Rating Stars', () => {
        component.maxSupportedStars = 5;
        component.rating = 4.3;
        component.ngOnChanges();
        const renderedStarRating = (component.starWidth/component.starWidthFactor) * component.maxSupportedStars;
        console.log(`Max Supported Stars: ${component.maxSupportedStars}, Specified Rating: ${component.rating}, Rendered Rating: ${renderedStarRating}`);
        expect(component.rating).toEqual(renderedStarRating);
    });
});