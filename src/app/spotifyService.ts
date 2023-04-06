import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { off } from 'process';



@Injectable({
  providedIn: 'root'
})
export class spotifyService {

  constructor(private http: HttpClient) {

  }

  getPlaylists() : Observable<any> {
   let url='http://localhost:3001/api/playlists'
   let cyclic_url='https://aggressive-dog-garment.cyclic.app/api/playlists'
    return this.http.get<any>(cyclic_url)

  }

  getProfile() : Observable<any> {
    let url='http://localhost:3001/api/me'
    let cyclic_url='https://aggressive-dog-garment.cyclic.app/api/me'
    return this.http.get<any>(cyclic_url)

  }
  getTopArtists(time_range:string) : Observable<any> {
    let url='http://localhost:3001/api/me/top/artists?time_range='+time_range
    let cyclic_url='https://aggressive-dog-garment.cyclic.app/api/me/top/artists?time_range='+time_range
    return this.http.get<any>(cyclic_url)

  }

  getSavedTracks(offset:number=0) : Observable<any> {
    let url='http://localhost:3001/api/me/top/tracks?offset='+ offset
    let cyclic_url='https://aggressive-dog-garment.cyclic.app/api/me/top/tracks?offset='+ offset
    return this.http.get<any>(cyclic_url)

  }
  getTrackFeatures(id) : Observable<any> {
    let url='http://localhost:3001/api/audio-features?trackId=' + id
    let cyclic_url='https://aggressive-dog-garment.cyclic.app/audio-features?trackId=' + id
    return this.http.get<any>(cyclic_url)

  }
  getTrack(id) : Observable<any> {
    let url='http://localhost:3001/api/track?trackId=' + id
    let cyclic_url='https://aggressive-dog-garment.cyclic.app/api/track?trackId=' + id
    return this.http.get<any>(cyclic_url)

  }


}
