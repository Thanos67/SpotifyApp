import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { spotifyService } from './spotifyService';
import { RouterModule, Routes } from '@angular/router'
import { TrackInfoComponent } from './track-info/track-info.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'track-info/:id', component: TrackInfoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrackInfoComponent
  ],
  imports:[ BrowserModule, RouterModule.forRoot(routes,{ useHash: true }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [spotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
