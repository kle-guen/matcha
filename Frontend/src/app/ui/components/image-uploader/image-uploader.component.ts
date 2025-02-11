import {Component, Input, OnInit} from '@angular/core';
import {MatFormField, MatInput} from "@angular/material/input";
import {ButtonComponent} from "../button/button.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatCardContent} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";

@Component({
	selector: 'app-image-uploader',
	standalone: true,
	imports: [
		MatInput,
		MatFormField,
		ButtonComponent,
		ReactiveFormsModule,
		MatCardContent,
		NgOptimizedImage
	],
	templateUrl: './image-uploader.component.html',
	styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent implements OnInit {

	/**
	 * The form control for the image uploader
	 */
	@Input() public formControl = new FormControl<File | null>(null);


	protected imgUrl: string = "";

	protected fileInputId!: string;

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
				this.formControl.setErrors({maxSize: true}); //todo add error handling
				return;
			}

			this.formControl.setValue(file);
		}
		this.updateimgUrl()
	}

	ngOnInit() {
		this.fileInputId = `fileInput-${Math.random().toString(36).substr(2, 9)}`;
		this.updateimgUrl();
	}

	updateimgUrl() {
		const file = this.formControl.value;

		if (!file || !(file instanceof Blob)) {
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			this.imgUrl = reader.result as string;
		};

		reader.onerror = (error) => {
			console.error("Erreur lors de la lecture du fichier :", error);
		};

		reader.readAsDataURL(file);
	}
}
