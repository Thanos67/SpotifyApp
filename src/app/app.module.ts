import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TracksComponent } from './tracks/tracks.component';
import { spotifyService } from './spotifyService';


@NgModule({
  declarations: [
    AppComponent,
    TracksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [spotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
