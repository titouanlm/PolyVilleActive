import { Injectable } from '@angular/core';
import {Inhabitant} from '../models/inhabitant.model';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class InhabitantService {

  public inhabitantsUrl =  'http://localhost:9428/api/inhabitants/';

  public currentInhabitant: Inhabitant;

  public number: number;

  public inhabitantForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.inhabitantForm = this.formBuilder.group({
      number: [''],
    });
  }

  createInhabitant(inhabitantNumber: number) {
    const inhabitant : Inhabitant = this.inhabitantForm.getRawValue() as Inhabitant;
    inhabitant.number = this.number;
    this.http.post<Inhabitant>( this.inhabitantsUrl,  inhabitantNumber).subscribe(
      (res) => inhabitant.number = res.number,
      (err) => console.log(err)
    );
    return inhabitant;
  }

  getInhabitant(inhabitantNumber: number){
    this.http.get<Inhabitant>(this.inhabitantsUrl + inhabitantNumber).subscribe((object) => {
      this.currentInhabitant = object;
      return this.currentInhabitant;
    });
    return null;
  }

}
