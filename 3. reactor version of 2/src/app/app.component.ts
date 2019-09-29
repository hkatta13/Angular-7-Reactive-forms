import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';

  get getUserName() {
    return this.userRegistrationForm.get('userName');
  }
  get getPassword() {
    return this.userRegistrationForm.get('password');
  }
  get getConfirmPassword() {
    return this.userRegistrationForm.get('confirmPassword');
  }
  get getCity() {
    return this.userRegistrationForm.get('address.city')
  }
  constructor(private fb: FormBuilder) { }



  //form model
  userRegistrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    address: this.fb.group({
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
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
