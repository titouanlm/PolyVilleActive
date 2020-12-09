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
    MyBlocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: DisplayForAllComponent },
      { path: 'visitorinhabitant', component: VisitorInhabitantDisplayComponent },
      { path: 'seller', component: SellerDisplayComponent },
      { path: 'seller/shop-information', component: ShopInformationComponent },
      { path: 'seller/blockly', component: MyBlocksComponent },
], { useHash: true}), /*{ relativeLinkResolution: 'legacy' }),*/
    NgxBlocklyModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
