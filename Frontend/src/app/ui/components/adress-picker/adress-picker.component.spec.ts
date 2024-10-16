import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressPickerComponent } from './adress-picker.component';

describe('AdressPickerComponent', () => {
  let component: AdressPickerComponent;
  let fixture: ComponentFixture<AdressPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdressPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
