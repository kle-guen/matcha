import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileHeaderComponent } from './complete-profile-header.component';

describe('RegisterHeaderComponent', () => {
  let component: CompleteProfileHeaderComponent;
  let fixture: ComponentFixture<CompleteProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteProfileHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
