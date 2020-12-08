import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicDisplayComponent } from './map-display/basic-display.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {NgxBlocklyModule} from 'ngx-blockly';
import { BlocklyComponent } from './blockly/blockly.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicDisplayComponent,
    TopBarComponent,
    BlocklyComponent
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
