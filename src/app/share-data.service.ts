import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
