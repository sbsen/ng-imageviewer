import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XcimageviewerComponent } from './xcimageviewer/xcimageviewer.component';

@NgModule({
  declarations: [
    AppComponent,
    XcimageviewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
