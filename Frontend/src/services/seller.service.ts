import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Seller} from "../models/seller.model";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class SellerService {

  public Url =  'http://localhost:9428/api/';
  private currentSellerSubject: BehaviorSubject<Seller>;
  public currentSeller: Observable<Seller>;

  public sellerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.currentSellerSubject = new BehaviorSubject<Seller>(JSON.parse(localStorage.getItem('currentSeller')));
    this.currentSeller = this.currentSellerSubject.asObservable();
    this.sellerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      shopId: [],
      id: [],
    });
  }

  public get currentSellerValue(): Seller {
    return this.currentSellerSubject.value;
  }

  authenticateSeller(sellerNumber: number){
    return this.http.post<any>('http://localhost:9428/api/sellers/authenticate', { "id": sellerNumber })
      .pipe(map(seller => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSeller', JSON.stringify(seller));
        this.currentSellerSubject.next(seller);
        return seller;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSeller');
    this.currentSellerSubject.next(null);
  }

}
