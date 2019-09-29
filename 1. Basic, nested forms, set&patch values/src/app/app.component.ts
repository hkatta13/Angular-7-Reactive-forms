import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';

  //form model
  userRegistrationForm = new FormGroup({
    userName: new FormControl('Harish'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      state: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('')
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
