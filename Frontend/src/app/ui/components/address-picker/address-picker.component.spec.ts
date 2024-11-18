import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addressPickerComponent } from './address-picker.component';

describe('addressPickerComponent', () => {
  let component: addressPickerComponent;
  let fixture: ComponentFixture<addressPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [addressPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(addressPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
