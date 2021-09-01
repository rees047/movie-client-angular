import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Test Service
 * This is made to share data between sibling components
 * Not implemented in this project but kept for lesson purposes
 */
export class ShareDataService {

  private data: any = '';

  constructor() { }

  setData(data:any) : void{
    this.data = data;
  }

  getData(): Observable<any>{
    let temp = this.data;
    //this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}
