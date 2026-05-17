import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  standalone: true,
  styleUrls: ['./createcustomer.component.css'],
  imports: [CommonModule, ReactiveFormsModule] 
})
export class CreatecustomerComponent implements OnInit {
  customerForm!: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      cust_name: ['', Validators.required],
      cust_phoneno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cust_email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const payload = { ...this.customerForm.value, cust_phoneno: Number(this.customerForm.value.cust_phoneno) };

    this.customerService.createCustomer(payload).subscribe({
      next: (res) => {
        alert(`Customer created (ID: ${res.cust_id})`);
        this.router.navigate(['/login']);
        this.customerForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to create customer. Please try again.';
        this.submitting = false;
      }
    });
  }
}
