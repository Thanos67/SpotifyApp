import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { spotifyService } from '../spotifyService';

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.css']
})
export class TrackInfoComponent  implements OnInit  {
  trackId: any;
  trackFeatures: any=[]
  track:any=[]

  constructor(
    private service : spotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    console.log(this.route.snapshot.url); // array of states
    this.trackId=this.route.snapshot.url[1].path
        console.log(this.route.snapshot.url[1].path); 

    this.service.getTrackFeatures(this.trackId)
      .subscribe(data=>{
      this.trackFeatures = data
      console.log(typeof data)
      console.log(this.trackFeatures)
      
  
      })
      this.service.getTrack(this.trackId)
      .subscribe(data=>{
      this.track = data
      console.log(typeof data)
      console.log(this.trackFeatures)
      
  
      })
  }

}
