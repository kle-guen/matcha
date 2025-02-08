import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPage } from './member-page.component';

describe('UsersComponent', () => {
  let component: MemberPage;
  let fixture: ComponentFixture<MemberPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
