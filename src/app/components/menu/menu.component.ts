import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActionService } from '../../services/action.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Table
  displayedColumns: string[] = ['foodname', 'calories', 'price', 'edit'];
  menu = (new MatTableDataSource([]));
  //Sort
  @ViewChild(MatSort) sort: MatSort;

  searchCriteria = {
    'stallname': ''
  };

  searchForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      stall: new FormControl('', Validators.required)
    });
  }

  constructor(private ActionSvc: ActionService,
              private route: Router) { 
    this.searchForm = this.createFormGroup();
  }

  get stall() { return this.searchForm.get('stall'); }

  reset() {
    this.searchForm.reset();
  }

    // go edit page
    goEditMenu(foodname, calories, price) {
      this.ActionSvc.editDetails = {
        'foodname' : foodname,
        'calories' : calories,
        'price' : price,
      };
      this.route.navigate(['/edit']);
    }
  
  onSubmit() {
    this.searchCriteria.stallname = ''; // reset to default
    console.log('Submitted Form data >>>>> ', this.searchForm.value);
    this.searchCriteria.stallname = `${this.searchForm.value.stall}`; 
    console.log('Sent Data >>>>> Stall Name:', this.searchCriteria.stallname);
    this.ActionSvc.getStall(this.searchCriteria).subscribe((results) => {
      console.log('Suscribed Results: ', results);
      this.menu = new MatTableDataSource(results);
      this.menu.sort = this.sort;
     });
     this.searchForm.reset();
  }

  ngOnInit() {
  }

}
