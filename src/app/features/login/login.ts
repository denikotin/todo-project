import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { AuthService } from '../../core/services/auth.service';
import { TuiPassword } from '@taiga-ui/kit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, TuiTextfield, TuiIcon, ReactiveFormsModule, TuiPassword],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  public loginForm: FormGroup;

  private auth = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })

  }

  public onSubmit() {
    this.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  private login(username: string, password: string) {

    const subscription = this.auth.login(username, password).subscribe({
      next: (response) => {
        if(response) this.router.navigate(['/home']);
        else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        subscription.unsubscribe();
      }
      
    })
  }
}
