import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../main-header/main-header.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
	selector: 'app-page-layout',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
	],
	templateUrl: './page-layout.component.html',
	styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {

}
