import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //Types for selection
  types = ['Area', 'Cuisine', 'Area & Cuisine'];

  //Table
  displayedColumns: string[] = ['stallname', 'stalladdress'];
  stalls = (new MatTableDataSource([]));
  //Sort
  @ViewChild(MatSort) sort: MatSort;
  //Paginator
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchCriteria = {
    'area': '',
    'cuisine': ''
  };

  searchForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      type: new FormControl('', Validators.required),
      term: new FormControl('', Validators.required),
    });
  }


  constructor(private ActionSvc: ActionService) {
    this.searchForm = this.createFormGroup();
  }

  get type() { return this.searchForm.get('type'); }
  get term() { return this.searchForm.get('term'); }

  reset() {
    this.searchForm.reset();
  }

  onSubmit() {
    this.searchCriteria.area = ''; // reset to default
    this.searchCriteria.cuisine = ''; // reset to default
    console.log('Submitted Form data >>>>> ', this.searchForm.value);
    if (this.searchForm.value.type === 'Area') {
      this.searchCriteria.area = `${this.searchForm.value.term}`; 
    } else {
      if (this.searchForm.value.type === 'Cuisine') {
        this.searchCriteria.cuisine = `${this.searchForm.value.term}`;
      }
      if (this.searchForm.value.type === 'Area & Cuisine') {
        this.searchCriteria.area = `${this.searchForm.value.term}`;
        this.searchCriteria.cuisine = `${this.searchForm.value.term}`;
      }
    }
    console.log('Sent Data >>>>> Area:', this.searchCriteria.area, ', Cuisine: ', this.searchCriteria.cuisine);
    this.ActionSvc.getStalls(this.searchCriteria).subscribe((results) => {
      console.log('Suscribed Results: ', results);
      this.stalls = new MatTableDataSource(results);
      this.stalls.sort = this.sort;
      this.stalls.paginator = this.paginator;
     });
     this.searchForm.reset();
  }

  ngOnInit() {
    this.ActionSvc.getStalls(this.searchCriteria).subscribe((results) => {
      console.log('Suscribed Results; ', results);
      this.stalls = new MatTableDataSource(results);
      this.stalls.sort = this.sort;
      this.stalls.paginator = this.paginator;
    });
  }

}
