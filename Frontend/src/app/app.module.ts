import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgxBlocklyModule } from 'ngx-blockly';
import { BlocklyComponent } from './blockly/blockly.component';
import { VisitorInhabitantDisplayComponent } from './visitor-inhabitant-display/visitor-inhabitant-display.component';
import { DisplayForAllComponent } from './display-for-all/display-for-all.component';
import { SellerDisplayComponent } from './seller-display/seller-display.component';
import { TestblockComponent } from './testblock/testblock.component';
import { MyBlocksComponent} from './MyBlocks/MyBlocks.component';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { PopupVisitorInhabitantAuthenticationComponent } from './popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import { PopupSellerAuthenticationComponent } from './popup-seller-authentication/popup-seller-authentication.component';
import {ShopListRatingComponent} from "./shop-list-rating/shop-list-rating.component";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { ShopRatingComponent } from './shop-rating/shop-rating.component';
import {ChartsModule} from "ng2-charts";
import { NotificationPromotionComponent } from './notification-promotion/notification-promotion.component';
import { AdditionalShopInfoComponent } from './additional-shop-info/additional-shop-info.component';
import { CityCenterInformationComponent } from './city-center-information/city-center-information.component';
import { OthersInformationComponent } from './others-information/others-information.component';
import { DialogPromoInformationComponent } from './dialog-promo-information/dialog-promo-information.component';
import { ThanksComponent } from './thanks/thanks.component';
import { InhabitantForSellerComponent } from './inhabitant-for-seller/inhabitant-for-seller.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BlocklyComponent,
    VisitorInhabitantDisplayComponent,
    TopBarComponent,
    DisplayForAllComponent,
    SellerDisplayComponent,
    TestblockComponent,
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
    ThanksComponent,
    InhabitantForSellerComponent,
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
      {path: 'seller/shop-information/othersinformation', component: OthersInformationComponent},
      {path: 'seller/blockly', component: MyBlocksComponent},
      {path: 'visitorinhabitant/shoprating', component: ShopListRatingComponent},
      {path: 'visitorinhabitant/shoprating/shop', component: ShopRatingComponent},
      {path: 'visitorinhabitant/shoprating/shop/additionalinfo', component: AdditionalShopInfoComponent},
      {path: 'visitorinhabitant/citycenterinformation', component: CityCenterInformationComponent},
      { path: '**', redirectTo: '' }
    ], {useHash: true}),
    NgxBlocklyModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbRatingModule,
    ChartsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  exports: [RouterModule/*, NgbdRatingBasic*/],
  entryComponents: [PopupVisitorInhabitantAuthenticationComponent,ThanksComponent],
})

export class AppModule { }
