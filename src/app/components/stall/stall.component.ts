import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../services/action.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stall',
  templateUrl: './stall.component.html',
  styleUrls: ['./stall.component.css']
})
export class StallComponent implements OnInit {

  addFields = {
    'stallname': '',
    'stalladdress': '',
    'area': '',
    'cuisine': ''
  };

  addForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
    stallname: new FormControl('', Validators.required),
    stalladdress: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    cuisine: new FormControl('', Validators.required)
    });
  }

  constructor(private ActionSvc: ActionService) { 
    this.addForm = this.createFormGroup();
  }

  get stallname() { return this.addForm.get('stallname'); }
  get stalladdress() { return this.addForm.get('stalladdress'); }
  get area() { return this.addForm.get('area'); }
  get cuisine() { return this.addForm.get('cuisine'); }

  onSubmit () {
    console.log('Stall Info: ', this.addForm.value);
    this.addFields.stallname = this.addForm.value.stallname;
    this.addFields.stalladdress = this.addForm.value.stalladdress;
    this.addFields.area = this.addForm.value.area;
    this.addFields.cuisine = this.addForm.value.cuisine;
    this.ActionSvc.addStall(this.addFields).subscribe((results) => {
      console.log('Suscribed results at', results);
      alert('Stall Added!');
    });
  }

  ngOnInit() {
  }


}
