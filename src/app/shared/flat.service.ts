import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flat } from './flat.model';
import { House } from './house.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  formData: Flat = {
    FlatId: null,
    FlatNumber: null,
    FlatFloor: null,
    FlatRoomsAmmount: null,
    FlatResidentAmmount: null,
    FlatFullArea: null,
    FlatLivingSpaceArea: null,
    HouseId: null,

  }
 
  

  readonly rootURL = 'http://localhost:50271/api'
  list : Flat[];
  houseIdList : House[];
  

  constructor(public http:HttpClient) { }

  postFlat(){
  return this.http.post(this.rootURL+'/Flat', this.formData);
  }

  putFlat(){
    return this.http.put(this.rootURL+'/Flat/'+this.formData.FlatId, this.formData);
    }

    deleteFlat(id){
      return this.http.delete(this.rootURL+'/Flat/'+id);
      }
    
 

  refreshList(){
    this.http.get(this.rootURL+'/Flat')
    .toPromise()
    .then(res => this.list = res as Flat[]  );
  }
  refreshList1() {
    this.http.get(this.rootURL+'/House')
    .toPromise()
    .then(res => this.houseIdList = res as House[]  );
  }
}
