import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

//Mat_Dialog_Data is used to get the data from the dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//for layout designs
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})

/**
 * Component for Displaying and Manipulating Genre Data
 * accepts data FROM movie-card/movie-component through MAT_DIALOG_DATA
 * @Inject(MAT_DIALOG_DATA) public data: any
 */
export class GenreViewComponent implements OnInit {

  /*
  * Changes size for mobile view
  * uses Observable and Breakpoint Observer to determine appropriate sizing
  */
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  smallDialogSubscription:any = '';

  constructor(
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    //console.log(this.data);
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
    //unsubsribe to avoid memory leak
    this.dialogRef.afterClosed().subscribe(result => {
        this.smallDialogSubscription.unsubscribe();
    });
  }
  
}
