import { Injectable } from '@angular/core';
import { House } from './house.model';
import { Flat } from './flat.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  formData:House = {
    HId: null,
    HouseNumber: null,
    HouseCity: null,
    HouseCountry: null,
    HousePostIndex: null, 
  }

  readonly rootURL = 'http://localhost:50271/api'
  list : House[];
  list1 : Flat[];

  constructor(public http:HttpClient) { }

  postHouse(){
  return this.http.post(this.rootURL+'/House', this.formData);
  }

getHouseFlats(id){
  this.http.get(this.rootURL+'/Houses/'+id+'/flats')
  .toPromise()
  .then(res => this.list1 = res as Flat[] );
}

  putHouse(){
    return this.http.put(this.rootURL+'/House/'+this.formData.HId, this.formData);
    }
    deleteHouse(id){
      return this.http.delete(this.rootURL+'/House/'+id);
      }

  refreshList(){
    const token = localStorage.getItem("jwt");
    this.http.get(this.rootURL+'/House', {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization':  "Bearer" + token
      })
    }).toPromise()
    .then(res => this.list = res as House[]  );

  }


  
}
