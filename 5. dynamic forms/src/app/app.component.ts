import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, FormGroup, FormArray } from '@angular/forms';

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
      address: this.fb.array([this.buildAddress()])
    });
    // this.userRegistrationForm.statusChanges.subscribe(state => console.log("state====", state));
  }
  get address(): FormArray {
    return this.userRegistrationForm.get("address") as FormArray;
  }
  buildAddress(): FormGroup{
    return this.fb.group({
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postalCode: ['']
    });
  }
  addAddress(){
    this.address.push(this.buildAddress());
  }
 
  get getCity() {
    return this.userRegistrationForm.get('address.city')
  }

  constructor(private fb: FormBuilder) { }



  onSubmitForm() {
    console.log(this.userRegistrationForm.value);
    console.log(this.userRegistrationForm);
    this.userRegistrationForm.reset();
  }

}
