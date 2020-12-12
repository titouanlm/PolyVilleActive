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
import { ShopRatingComponent } from './shop-rating/shop-rating.component';

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
    ShopRatingComponent,
    ShopInformationComponent
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
      {path: 'seller/blockly', component: MyBlocksComponent},
      {path: 'visitorinhabitant/shoprating', component: ShopRatingComponent},
    ], {useHash: true}),
    NgxBlocklyModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  entryComponents: [PopupVisitorInhabitantAuthenticationComponent],
})

export class AppModule { }
