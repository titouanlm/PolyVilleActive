import {Component, OnInit} from '@angular/core';
import {nameAvailabilityType, Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";
import {InhabitantService} from "../../services/inhabitant.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Inhabitant} from "../../models/inhabitant.model";

interface EnterForm {
  inhabitantId: string;
  placeName: string;
}

interface ExitForm {
  inhabitantId: string;
}


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public shops : Shop[];
  public places : nameAvailabilityType[];
  public enterForm: FormGroup;
  public exitForm: FormGroup;

  public inhabitantToPark : Inhabitant;
  public placeChoose : nameAvailabilityType;

  submitted=false;
  constructor(public shopService : ShopService, public formBuilder: FormBuilder, public inhabitantService: InhabitantService) {
    this.updatePlaces();
    this.enterForm= this.formBuilder.group({
      inhabitantId: ['',Validators.required],
      placeName:  ['',Validators.required]
    });
    this.exitForm= this.formBuilder.group({
      inhabitantId: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  updatePlaces(){
    this.shopService.getShopsFromUrl();
    this.shopService.shops$.subscribe((shops) =>{
      this.shops = shops;
      this.places = [];
      if(this.shops){
        this.shops.forEach((shop) => {
          this.places = this.places.concat(shop.parkingSpace.places);
        });
      }
    });
  }

  inhabitantAlreadyPark(inhabitantToPark: Inhabitant) {
    const placesNotAvailable = this.places.filter((place) => place.availability === false);
    return  placesNotAvailable.find((place) => place.inhabitantIdParked === inhabitantToPark.id);
  }

  placeAvailable(placeName: string) {
     this.placeChoose = this.places.find((place) => place.name === placeName && place.availability);
  }

  parkInhabitantOn() {
    this.placeChoose.availability = false;
    this.placeChoose.inhabitantIdParked = this.inhabitantToPark.id;
    this.updateShop(this.placeChoose);
  }

  submitEnter() {
    this.submitted = true;
    var enterF  : EnterForm = this.enterForm.getRawValue() as EnterForm;

    this.inhabitantService.getInhabitant(Number(enterF.inhabitantId))
      .subscribe(
        data => {
          this.inhabitantToPark = data;

          if(!this.inhabitantAlreadyPark(this.inhabitantToPark)){
            var placeReserved = this.places.find((place) => place.inhabitantIdReserved === this.inhabitantToPark.id)
            if(placeReserved){
              this.placeChoose = placeReserved;
              this.parkInhabitantOn();
              alert("This inhabitant got a reservation on " + this.placeChoose.name)
            }else{
              this.placeAvailable(enterF.placeName);
              if(this.placeChoose){
                if(!this.placeChoose.reserved){
                  this.parkInhabitantOn();
                }else{
                  alert("Error : the place is reserved for another inhabitant.")
                }
              }else{
                alert("Error : the place doesn't exist or is not available.")
              }
            }
          }else{
            alert("Error : the inhabitant is already parked.")
          }
        },
        error => {
          alert("Error : the inhabitant doesn't exist.");
        });
  }

  updateShop(place : nameAvailabilityType){
    this.shops.forEach((shop) => {
      if(shop.id === place.shopId){
        this.shopService.updateShop(shop);
        return;
      }
    });
    this.enterForm.reset();
    this.exitForm.reset();
  }

  submitExit() {
    var exitF  : ExitForm = this.exitForm.getRawValue() as ExitForm;
    var p = this.places.find((place) => place.inhabitantIdParked === Number(exitF.inhabitantId))
    if(p){
      p.availability = true;
      p.reserved = false;
      p.inhabitantIdParked = -1;
      p.inhabitantIdReserved = -1;
      //Decremente
      this.updateShop(p);

      this.inhabitantService.getInhabitant(Number(exitF.inhabitantId))
        .subscribe(
          inhabitant => {
            if(inhabitant.currentReservation.shopName != "" && inhabitant.currentReservation.price === 0 ){
              alert("You have to pay nothing. It's free because of your purchases.");
            }else{
              alert("You have to pay 5$");
            }
            inhabitant.currentReservation = {
              price: 0,
              heureDebut: "",
              heureFin: "",
              place: "",
              platNumber: "",
              shopId: 0,
              shopName: ""
            };
            this.inhabitantService.updateInhabitant(inhabitant);
          });

    }else{
      alert("This inhabitant is not parked in the parking.")
    }
  }
}
