import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgxBlocklyModule } from 'ngx-blockly';
import { VisitorInhabitantDisplayComponent } from './visitor-inhabitant-display/visitor-inhabitant-display.component';
import { DisplayForAllComponent } from './display-for-all/display-for-all.component';
import { SellerDisplayComponent } from './seller-display/seller-display.component';
import { MyBlocksComponent} from './MyBlocks/MyBlocks.component';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { PopupVisitorInhabitantAuthenticationComponent } from './popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { PopupSellerAuthenticationComponent } from './popup-seller-authentication/popup-seller-authentication.component';
import { ShopListRatingComponent} from "./shop-list-rating/shop-list-rating.component";
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { ShopRatingComponent } from './shop-rating/shop-rating.component';
import { ChartsModule } from "ng2-charts";
import { NotificationPromotionComponent } from './notification-promotion/notification-promotion.component';
import { AdditionalShopInfoComponent } from './additional-shop-info/additional-shop-info.component';
import { CityCenterInformationComponent } from './city-center-information/city-center-information.component';
import { OthersInformationComponent } from './others-information/others-information.component';
import { DialogPromoInformationComponent } from './dialog-promo-information/dialog-promo-information.component';
import { CulturalActorBlocksComponent } from "./CulturalActorBlocks/CulturalActorBlocks.component";
import { TownHallEmployeeBlocksComponent } from './town-hall-employee-blocks/town-hall-employee-blocks.component';
import { ThanksComponent } from './thanks/thanks.component';
import { InhabitantForSellerComponent } from './inhabitant-for-seller/inhabitant-for-seller.component';
import { PopupVisitorInhabitantAutorisationComponent} from "./popup-visitor-inhabitant-autorisation/popup-visitor-inhabitant-autorisation.component";
import { PopupCulturalActorAuthentificationComponent } from "./popup-cultural-actor-authentification/popup-cultural-actor-authentification.component";
import { PopupTownHallEmployeeAuthentificationComponent } from "./popup-town-hall-employee-authentification/popup-town-hall-employee-authentification.component";
import { CulturalActorHomeComponent } from "./cultural-actor-home/cultural-actor-home.component";
import { TownHallEmployeeHomeComponent } from "./town-hall-employee-home/town-hall-employee-home.component";
import { StoreItemsComponent } from "./store-items/store-items.component";
import { DialogAlertShopComponent } from "./dialog-alert-shop/dialog-alert-shop.component";
import { ItemStatisticsComponent } from "./item-statistics/item-statistics.component";
import {CulturalActorEventsComponent} from "./cultural-actor-events/cultural-actor-events.component";
import {DatePipe} from "@angular/common";
import {EventListRatingComponent} from "./event-list-rating/event-list-rating.component";
import { ParkingComponent } from './parking/parking.component';
import {ParkingPlacesComponent} from "./parking-places/parking-places.component";
import { ParkingServationComponent } from './parking-servation/parking-servation.component';
import {MatCardModule} from "@angular/material/card";
import {FreeParkingPlacesComponent} from "./free-parking-places/free-parking-places.component";



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    VisitorInhabitantDisplayComponent,
    TopBarComponent,
    DisplayForAllComponent,
    SellerDisplayComponent,
    MyBlocksComponent,
    PopupVisitorInhabitantAuthenticationComponent,
    PopupSellerAuthenticationComponent,
    ShopListRatingComponent,
    ShopRatingComponent,
    ShopInformationComponent,
    NotificationPromotionComponent,
    AdditionalShopInfoComponent,
    CityCenterInformationComponent,
    OthersInformationComponent,
    DialogPromoInformationComponent,
    CulturalActorBlocksComponent,
    TownHallEmployeeBlocksComponent,
    ThanksComponent,
    InhabitantForSellerComponent,
    PopupVisitorInhabitantAutorisationComponent,
    PopupCulturalActorAuthentificationComponent,
    PopupTownHallEmployeeAuthentificationComponent,
    CulturalActorHomeComponent,
    CulturalActorBlocksComponent,
    TownHallEmployeeHomeComponent,
    StoreItemsComponent,
    DialogAlertShopComponent,
    ItemStatisticsComponent,
    CulturalActorEventsComponent,
    EventListRatingComponent,
    ParkingComponent,
    ParkingPlacesComponent,
    ParkingServationComponent,
    FreeParkingPlacesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: '', component: DisplayForAllComponent},
      {path: 'visitorinhabitant', component: VisitorInhabitantDisplayComponent},
      {path: 'seller', component: SellerDisplayComponent},
      {path: 'seller/shop-information', component: ShopInformationComponent},
      {path: 'seller/shop-information/my-parking-places', component: ParkingPlacesComponent},
      {path: 'seller/shop-information/othersinformation', component: OthersInformationComponent},
      {path: 'seller/shop-information/othersinformation/itemstatistics', component: ItemStatisticsComponent},
      {path: 'seller/blockly', component: MyBlocksComponent},
      {path: 'visitorinhabitant/shoprating', component: ShopListRatingComponent},
      {path: 'visitorinhabitant/shoprating/shop', component: ShopRatingComponent},
      {path: 'visitorinhabitant/shoprating/shop/items', component: StoreItemsComponent},
      {path: 'visitorinhabitant/shoprating/shop/additionalinfo', component: AdditionalShopInfoComponent},
      {path: 'visitorinhabitant/citycenterinformation', component: CityCenterInformationComponent},
      {path: 'visitorinhabitant/eventrating', component: EventListRatingComponent},
      {path: 'cultural-actor', component: CulturalActorHomeComponent},
      {path: 'cultural-actor/blockly', component: CulturalActorBlocksComponent},
      {path: 'cultural-actor/events', component: CulturalActorEventsComponent},
      {path: 'town-hall-employee', component: TownHallEmployeeHomeComponent},
      {path: 'town-hall-employee/blockly', component: TownHallEmployeeBlocksComponent},
      {path: 'parking', component: ParkingComponent},
      {path: 'visitorinhabitant/parking-places/reservation', component: ParkingServationComponent},
      {path: 'visitorinhabitant/parking-places', component: FreeParkingPlacesComponent},
      {path: '**', redirectTo: ''},
    ], {onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy'}/*{useHash: true}*/),
    NgxBlocklyModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbRatingModule,
    ChartsModule,
    MatCardModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  entryComponents: [PopupVisitorInhabitantAuthenticationComponent,ThanksComponent],
})

export class AppModule { }
