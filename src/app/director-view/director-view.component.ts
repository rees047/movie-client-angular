import { Component, OnInit, Inject} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

//Mat_Dialog_Data is used to get the data from the dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.birthdate = this.refineDate(this.data.birthdate);
  }

  close(): void{
    this.dialogRef.close();
  }

  refineDate(longDate: any){

    const date = new Date(longDate);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const dt = date.getDate(); //type number cannot be a string; angular is particular about data types
    const zero = 0;
    
    let formatDt = '';    
    let finalDate = '';

    const monthNames = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec ' ]

    if (dt < 10) {
      formatDt = zero.toString().concat(dt.toString())
    }

    finalDate = formatDt.concat(monthNames[month]);
    finalDate = finalDate.concat(year.toString());
    //console.log(finalDate);
    return finalDate;
  }    
  

}
