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


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BlocklyComponent,
    VisitorInhabitantDisplayComponent,
    TopBarComponent,
    DisplayForAllComponent,
    SellerDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: DisplayForAllComponent },
      { path: 'visitorinhabitant', component: VisitorInhabitantDisplayComponent },
      { path: 'seller', component: SellerDisplayComponent },
], { relativeLinkResolution: 'legacy' }),
    NgxBlocklyModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
