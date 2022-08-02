import { ThisReceiver } from '@angular/compiler';
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
  key: string='';

  constructor(
    private service : spotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
    keyMap = new Map<number, string>([
    [0, "C"],
    [1, "C#"],
    [2, "D"],
    [3, "D#"],
    [4, "E"],
    [5, "F"],
    [6, "F#"],
    [7, "G"],
    [8, "G#"],
    [9, "A"],
    [10, "Α#"],
    [11, "Β"],
  ]);

  ngOnInit() {
    this.trackId=this.route.snapshot.url[1].path

    this.service.getTrackFeatures(this.trackId)
      .subscribe(data=>{
      this.trackFeatures = data
      this.trackFeatures['key']=this.keyMap.get(this.trackFeatures['key'])
      })
      this.service.getTrack(this.trackId)
      .subscribe(data=>{
      this.track = data
      })
  }
}