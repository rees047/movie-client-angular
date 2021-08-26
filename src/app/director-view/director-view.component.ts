import { Component, OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs'

//Mat_Dialog_Data is used to get the data from the dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//for layout designs
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  smallDialogSubscription:any = '';

  constructor(
    public dialogRef: MatDialogRef<DirectorViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.data.birthdate = this.refineDate(this.data.birthdate);
    this.smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if(result.matches){
        this.dialogRef.updateSize('100%');
      }else{
        this.dialogRef.updateSize('50%');
      }
    });
  }

  close(): void{
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.smallDialogSubscription.unsubscribe();
    });
  }

  refineDate(longDate: any){

    const date = new Date(longDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const dt = date.getDate(); //type number cannot be a string; angular is particular about data types
    const zero = 0;
    
    let formatDt = '';    
    let finalDate = '';

    const monthNames = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec ' ]

    if (dt < 10) {
      formatDt = zero.toString().concat(dt.toString())
    }else{
      formatDt = dt.toString();
    }
    
    finalDate = formatDt.concat(monthNames[month]);
    finalDate = finalDate.concat(year.toString());
    //console.log(finalDate);
    return finalDate;
  }   

}
