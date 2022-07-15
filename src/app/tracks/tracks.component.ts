import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { spotifyService } from '../spotifyService';
import { map } from 'rxjs/operators';
import { playlists } from '../playlists';

@Component({
  selector: 'tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  public playlists :any[]=[] ;
  public monthlyTopArtists :any[]=[] ;
  public topArtists :any[]=[] ;
  public user;
  public logedIn=false
  items = [1, 2, 3 ,4];
  
  

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

}

