import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.scss'
})
export class Landingpage {
  profile: Profile | undefined;
  loading = false;
  errorMsg = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  navegar(): void {
    this.router.navigate(['/paginas/galeria']);
  }

  logar(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        console.log('Login realizado com sucesso!');
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Falha no login. Verifique suas credenciais.';
        console.error(err);
      },
    });

  }

  isLoggedIn(): boolean {
    //this.profile = this.loginService.getProfile();
    return !!this.profile;
  }


}
