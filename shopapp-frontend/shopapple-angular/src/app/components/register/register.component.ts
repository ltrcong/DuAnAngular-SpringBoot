import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NavigationBarComponent,
    HeaderComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Khai báo các biến dữ liệu tương ứng với các trường dữ liệu trong form
  fullName: string;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  isAccepted: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.fullName = '';
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.gender = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
    //inject tạo ra một đối tượng trong class
  }

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`)
  }

  register() {
    const message = `fullName: ${this.fullName}` +
      `phoneNumber: ${this.phoneNumber}` +
      `password: ${this.password}` +
      `retypePassword: ${this.retypePassword}` +
      `gender: ${this.gender}` +
      `address:${this.address}` +
      `isAccepted = ${this.isAccepted}` +
      `dateOfBirth = ${this.dateOfBirth}`

    const registerDTO: RegisterDTO = {
      "full_name": this.fullName,
      "phone_number": this.phoneNumber,
      "gender": this.gender,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }

    debugger
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        //Xử lý kết quả trả về khi đăng ký thành công
        if (response && (response.status === 200 || response.status === 201)) {
          debugger
          //Đăng ký chuyển sang màn hình đăng nhập
          this.router.navigate(['/login']);
        } else {
          //Xử lsy trường hợp đăng ký không thành công nếu cần
        }
      },
      complete: () => {
        //Xử lý lỗi nếu có
        debugger

      },
    })
  }

  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': age });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }

  loginAccount() {
    debugger
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/login']); 
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}