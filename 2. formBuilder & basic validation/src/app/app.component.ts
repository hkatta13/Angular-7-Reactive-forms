import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';

  get password() {
    return this.userRegistrationForm.get('password');
  }
  constructor(private fb: FormBuilder) { }



  //form model
  userRegistrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    address: this.fb.group({
      state: [''],
      city: [''],
      postalCode: ['']
    })
  });

  onSubmitForm() {
    console.log(this.userRegistrationForm.value);
    console.log(this.userRegistrationForm);
  }
  loadData() {
    this.userRegistrationForm.setValue({
      userName: 'harish katta',
      password: 'password',
      confirmPassword: 'password',
      address: {
        state: 'Tg',
        city: 'KNR',
        postalCode: 505001
      }
    });
  }
  loadParticalData() {
    this.userRegistrationForm.patchValue({
      userName: 'harish katta',
      password: 'password',
      confirmPassword: 'password'
    });
  }
}
