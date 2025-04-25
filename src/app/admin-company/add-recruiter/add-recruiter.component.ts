import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhCompanyService } from '../../services/rh-company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recruiter',
  templateUrl: './add-recruiter.component.html',
  styleUrls: ['./add-recruiter.component.css'],
  standalone: false
})
export class AddRecruiterComponent implements OnInit {
  recruiterForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private rhCompanyService: RhCompanyService,
    private router: Router
  ) {
    this.recruiterForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isValid: [true]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recruiterForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    this.loading = true;
    this.rhCompanyService.addRhCompany(this.recruiterForm.value).subscribe({
      next: () => {
        console.log('this.recruiterForm.value', this.recruiterForm.value);
        alert('Recruiter created successfully');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/admin/recruiters']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Error creating recruiter');
      }
    });
  }
}