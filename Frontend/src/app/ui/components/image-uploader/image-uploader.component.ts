import {Component, Input} from '@angular/core';
import {MatFormField, MatInput} from "@angular/material/input";
import {ButtonComponent} from "../button/button.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {PictureDto} from "../../../data/dto/send/picture.dto";

@Component({
  selector: 'app-image-uploader',
  standalone: true,
	imports: [
		MatInput,
		MatFormField,
		ButtonComponent,
		ReactiveFormsModule
	],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

	/**
	 * The form control for the image uploader
	 */
	@Input() public formControl = new FormControl();

	/**
	 * Boolean to check if the image is a profile picture
	 */
	@Input() public isProfilePicture = false;

	/**
	 * The allowed max size of the file
	 */
	public readonly ALLOWED_MAX_SIZE = 4 * 1024 * 1024; // 4 MB

	/**
	 * Handles the file selected event
	 * @param event
	 */
	public onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];

			if (file.size > this.ALLOWED_MAX_SIZE) {
				this.formControl.setErrors({ maxSize: true }); //todo add error handling
				return;
			}

			this.formControl.setValue({
				file: file,
				isProfilePicture: this.isProfilePicture
			} as PictureDto);
		}
	}
}
