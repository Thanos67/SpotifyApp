import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { spotifyService } from '../spotifyService';
import { map } from 'rxjs/operators';
import { playlists } from '../playlists';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public playlists :any[]=[] ;
  public savedTracks :any[]=[] ;
  public monthlyTopArtists :any[]=[] ;
  public topArtists :any[]=[] ;
  public user;
  public logedIn=false
  public playlistsClicked:boolean=false;
  public savedTracksClicked:boolean=false;
  public totalSavedTracks

  
  

  constructor(private service : spotifyService) { 
   
  }

  ngOnInit(): void {
    
     this.service.getProfile()
      .subscribe(data=>{
      this.user = data
      console.log('this. user', this.user)
      if('error' in this.user) {
        console.log('in catch error ',this.user.error)
        this.logedIn=false
        console.log(this.logedIn)
       }else{
      this.logedIn=true
      console.log('in catch error ',this.user)
      console.log(this.logedIn)
      
      }
      })
//fetch top artists 
      this.service.getTopArtists('long_term')
      .subscribe(data=>{
      this.topArtists = data['items']
      console.log(typeof data)
      console.log(this.playlists)
  
      })
//fetch top artists for last month
      this.service.getTopArtists('medium_term')
      .subscribe(data=>{
      this.monthlyTopArtists = data['items']
      console.log(typeof data)
      console.log(this.playlists)
  
      })

  }


  getPlaylists(){
    this.service.getPlaylists()
    .subscribe(data=>{
    this.playlists = data['items']
    console.log(typeof data)
    console.log(this.playlists)
    this.playlistsClicked=true
    this.savedTracksClicked=false

    })
  }

  getTopArtists(){
    this.service.getTopArtists('long_term')
    .subscribe(data=>{
    this.topArtists = data['items']
    console.log(typeof data)
    console.log(this.playlists)

    })
  }

  getSavedTracks(){
    this.service.getSavedTracks()
    .subscribe(data=>{
    this.savedTracks = data['items']
    this.totalSavedTracks=data['total']
    console.log(typeof data)
    console.log('number of saved tracks' +this.totalSavedTracks)
    console.log(' saved tracks' +this.savedTracks)


  
    this.savedTracksClicked=true
    this.playlistsClicked=false
    })
    
  }

}

