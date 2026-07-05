import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { register } from '../Dto/Register';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 registerForm!:FormGroup
  showPassword = false;
  showConfirmPassword = false;

  constructor(
              private accountService:AccountService,
              private formbuilder:FormBuilder,
              private router:Router,
              private toast:ToastrService
            ){}


  ngOnInit(): void {
    this.checkForm();
  }

  checkForm(){
    this.registerForm=this.formbuilder.group({
      txtfName:['',Validators.required],
      txtlName:['',Validators.required],
      txtEmail:['',Validators.compose([Validators.required,Validators.email])],
      txtDOB:['',Validators.required],
      txtGender:['',Validators.required],
      txtPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/)
        ])
      ],
      txtConfirmPassword:['',[Validators.required,this.validateSamePassword]]
    });
  }

  addUser(){
    if(this.registerForm.valid)
      {
        var user=new register();
        user.firstName=this.registerForm.value['txtfName'];
        user.lastName=this.registerForm.value['txtlName'];
        user.email=this.registerForm.value['txtEmail'];
        user.gender=this.registerForm.value['txtGender'];
        user.password=this.registerForm.value['txtPassword'];
        user.confirmPassword=this.registerForm.value['txtConfirmPassword'];
     
        console.log('User data:', user);

      this.accountService.register(user).subscribe({
        next: data => {
          console.log('API Response:', data);
          if (data.message === 'User created successfully') {
            this.toast.success(data.message);
            this.router.navigate(['/'], { queryParams: { user: user.email } });
          }
        },
        error:err=>{
          this.toast.warning(err.error.message);
        }
      });
    }
  }

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('txtPassword');
    const confirmPassword = control.parent?.get('txtConfirmPassword');
    return password?.value == confirmPassword?.value ? null : { 'notSame': true };
}

togglePasswordVisibility(field: string) {
  if (field === 'password') {
    this.showPassword = !this.showPassword;
  } else if (field === 'confirmPassword') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
}
