import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResearchUsersComponent} from './research-users.component';

describe('HomeComponent', () => {
	let component: ResearchUsersComponent;
	let fixture: ComponentFixture<ResearchUsersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResearchUsersComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ResearchUsersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
