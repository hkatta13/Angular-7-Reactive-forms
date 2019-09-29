import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  forbiddenNamesList = ['admin']
  userRegistrationForm: FormGroup;
  ngOnInit() {
    //form model
    this.userRegistrationForm = this.fb.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          // this.forbiddenNames.bind(this),
          this.forbiddenNamesWithParms(this.forbiddenNamesList)
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [''], // we will assign validators based on subscribe flag
      subscribeAlerts: [false],
      address: this.fb.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postalCode: ['']
      })
    }, { validator: this.passwordValidator });

    this.userRegistrationForm.get('subscribeAlerts').valueChanges.subscribe(checkedValue => {
      const email = this.userRegistrationForm.get('email');

      if (checkedValue) {
        email.setValidators([Validators.required, Validators.minLength(3)]);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });

    this.userRegistrationForm.statusChanges.subscribe(state => console.log("state====", state));


  }

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

  get getEmail() {
    return this.userRegistrationForm.get('email')
  }
  constructor(private fb: FormBuilder) { }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    // help to retu null & beacuse after both password & confirmPassword values enter only mismacth will check
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatchPassword: true }
    }
    return null;
  }

  forbiddenNames(control: AbstractControl): { [key: string]: boolean } | null {
    console.log(control);
    if (this.forbiddenNamesList.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    } else null;
  }

  forbiddenNamesWithParms(forbiddenNamesList: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (forbiddenNamesList.indexOf(control.value) !== -1) {
        return { nameIsForbidden: true };
      } else null;
    }
  }




  onSubmitForm() {
    console.log(this.userRegistrationForm.value);
    console.log(this.userRegistrationForm);
    this.userRegistrationForm.reset();
  }

  loadData() {
    this.userRegistrationForm.setValue({
      userName: 'harish katta',
      password: 'password',
      confirmPassword: 'password',
      email: 'email',
      subscribeAlerts: true,
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
