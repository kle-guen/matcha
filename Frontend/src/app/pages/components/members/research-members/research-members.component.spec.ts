import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResearchMembersComponent} from './research-members.component';

describe('HomeComponent', () => {
	let component: ResearchMembersComponent;
	let fixture: ComponentFixture<ResearchMembersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResearchMembersComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ResearchMembersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
