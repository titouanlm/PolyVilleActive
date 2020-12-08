import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicDisplayComponent } from './map-display/basic-display.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {NgxBlocklyModule} from 'ngx-blockly';

@NgModule({
  declarations: [
    AppComponent,
    BasicDisplayComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
    { path: '', component: BasicDisplayComponent },
], { relativeLinkResolution: 'legacy' }),
    NgxBlocklyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
