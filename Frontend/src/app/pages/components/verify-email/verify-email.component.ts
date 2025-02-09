import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoginHeaderComponent} from "../login/login-header/login-header.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    MatProgressSpinner,
    LoginHeaderComponent
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements AfterViewInit {

  /**
   * The verified state.
   */
  public isVerified = true;

  /**
   * The router.
   */
  private readonly router = inject(Router);

  /**
   * The snackbar.
   */
  private readonly snackBar = inject(MatSnackBar);

  /**
   * @inheritDoc
   */
  ngAfterViewInit() {
    const animateElement = document.querySelector("animate");

    if (animateElement) {
      animateElement.addEventListener("endEvent", () => {
        this.snackBar.open('Redirecting to login', 'Close', {duration: 1500});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      });
    }
  }
}


