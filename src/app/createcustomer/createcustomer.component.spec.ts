import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatecustomerComponent } from './createcustomer.component';
import { CustomerService } from '../services/customer.service';

describe('CreatecustomerComponent', () => {
  let component: CreatecustomerComponent;
  let fixture: ComponentFixture<CreatecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatecustomerComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [CustomerService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    expect(component.customerForm.valid).toBeFalse();
  });

  it('should validate email field correctly', () => {
    const email = component.customerForm.controls['cust_email'];
    email.setValue('invalid-email');
    expect(email.valid).toBeFalse();
    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();
  });
});
