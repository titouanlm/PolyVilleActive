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


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public shops : Shop[];
  public places : nameAvailabilityType[];
  public enterForm: FormGroup;

  public inhabitantToPark : Inhabitant;
  public placeChoose : nameAvailabilityType;

  submitted=false;
  constructor(public shopService : ShopService, public formBuilder: FormBuilder, public inhabitantService: InhabitantService) {
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
    this.enterForm= this.formBuilder.group({
      inhabitantId: ['',Validators.required],
      placeName:  ['',Validators.required]
    });
  }

  ngOnInit(): void {
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
    this.shops.forEach((shop) => {
      if(shop.id === this.placeChoose.shopId){
        this.shopService.updateShop(shop);
        return;
      }
    });
    this.enterForm.reset();
  }

  submit() {
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

}
