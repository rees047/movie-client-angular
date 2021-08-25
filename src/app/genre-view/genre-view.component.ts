import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

//Mat_Dialog_Data is used to get the data from the dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    //console.log(this.data);
  }

  close(): void{
    this.dialogRef.close();
  }

  
}
