import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Customer {
  cust_id?: number;
  cust_name: string;
  cust_phoneno: number; // or string if you prefer
  cust_email: string;
  street: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }
}
