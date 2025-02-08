import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-button',
  standalone: true,
	imports: [
		MatButton,
		MatIconModule
	],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

	/**
	 * Emits when the button is clicked.
	 */
	@Output() clicked = new EventEmitter<void>();

	/**
	 * The label of the button.
	 */
	@Input() label = '';

	/**
	 * Whether the button is disabled.
	 */
	@Input() disabled = false;

	/**
	 * The type of the button.
	 */
	@Input() type: 'primary' | 'secondary' | 'tertiary' = 'primary';

	/**
	 * The icon of the button.
	 */
	@Input() icon: string | null = null;

	/**
	 * The icon style of the button.
	 */
	@Input() iconStyle: string | null = "";

	/**
	 * Handles the click event of the button.
	 */
	public onClick() {
		this.clicked.emit();
	}
}
