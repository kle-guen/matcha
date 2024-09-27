import { Component } from '@angular/core';
import {MatFormField, MatInput} from "@angular/material/input";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-image-uploader',
  standalone: true,
	imports: [
		MatInput,
		MatFormField,
		ButtonComponent
	],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

}
