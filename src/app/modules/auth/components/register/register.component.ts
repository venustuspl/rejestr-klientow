import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    console.log('');
    // this.registerForm.controls.email.disable();
    // this.controls.username.setValidators();
    // this.controls.username.addValidators();
    // this.registerForm.patchValue();
    // this.registerForm.setValue();
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz wpisać jakąś wartość.';
    }

    if (control.hasError('minlength')) {
      return 'Przekazałeś za mało znaków w kontrolce.';
    }

    if (control.hasError('maxlength')) {
      return 'Przekazałeś za dużo znaków w kontrolce.';
    }

    return control.hasError('email') ? 'Nieprawidłowy adres e-mail' : '';
  }

  onRegister() {
    console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());
  }
}
