import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Shop} from "../../models/shop.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Reservation} from "../../models/reservation.model";
import {InhabitantService} from "../../services/inhabitant.service";
import {Inhabitant} from "../../models/inhabitant.model";

@Component({
  selector: 'app-parking-servation',
  templateUrl: './parking-servation.component.html',
  styleUrls: ['./parking-servation.component.scss']
})
export class ParkingServationComponent implements OnInit {

  shops: Shop[]
  public reservationForm: FormGroup;
  selectedShop : Shop
  inhabitant : Inhabitant
  submitted=false


  constructor(public shopService: ShopService,public formBuilder: FormBuilder,public inhabitantService: InhabitantService) {
      shopService.getShopsFromUrl();
      shopService.shops$.subscribe(list => {
        this.shops=list;
      })
      console.log(this.shops)
    this.reservationForm= this.formBuilder.group({
      platNumber: ['',Validators.required],
      heureDebut:  ['',Validators.required],
      heureFin:  ['',Validators.required],
      shopId :  [this.shops[0].id,Validators.required]
    });
      inhabitantService.currentInhabitant$.subscribe(hab=>{
        this.inhabitant=hab;
      });
  }

  ngOnInit(): void {
  }

  /**
   * methode qui permet d'effectuer une reservation, elle met a jour les information de la place
   * reservé dans léspace de parking du shop si elle exit et crée la reservation pour le client
   */

  makeReservation() {
    this.submitted = true;
    if (this.reservationForm.invalid) {
      alert("All the input values are require")
      return;
    }
    const reservationToCreate: Reservation = this.reservationForm.getRawValue() as Reservation;
    reservationToCreate.shopId= +reservationToCreate.shopId;
    console.log(reservationToCreate)

    this.shopService.getShopFromUrl(reservationToCreate.shopId+'');
    try {
      if (this.inhabitant.currentReservation){
        alert("You can't make tow reservations, you have to abort the existing one before")
        return;
      }
      this.shopService.shopSelected$.subscribe(sop=> {
        this.selectedShop = sop;

        if (this.selectedShop.parkingSpace.nbrPlaceFree > 0){
          for(let a=0;a<(this.selectedShop.parkingSpace.nbrPlace-this.selectedShop.parkingSpace.nbrPlaceUnassignable);a++) {
            if (!this.selectedShop.parkingSpace.places[a].reserved && this.selectedShop.parkingSpace.places[a].availability ) {

              this.selectedShop.parkingSpace.places[a].reserved=true;
              this.selectedShop.parkingSpace.places[a].inhabitantIdReserved= this.inhabitant.id;
              this.selectedShop.parkingSpace.nbrPlaceFree--;
              this.inhabitant.currentReservation = reservationToCreate;
              this.inhabitant.currentReservation.place=this.selectedShop.parkingSpace.places[a].name;
              break;
            }
          }
          this.inhabitant.currentReservation.shopName=this.selectedShop.label
          this.shopService.updateShop(this.selectedShop);
          this.inhabitantService.updateInhabitant(this.inhabitant);
          alert('You parking place have been reserved !!!')
        }else {
          throw 'All the parking places of this shop are already reserved'
        }
      })
    }catch (e) {
      throw e
    }

  }

  onReset(){
    this.submitted=false
  }
}
