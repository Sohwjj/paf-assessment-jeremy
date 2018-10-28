import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../services/action.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editFields = {
    'foodname': '',
    'calories': '',
    'price': '',
  };

  editForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
    foodname: new FormControl(''),
    calories: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
    });
  }

  constructor(private ActionSvc: ActionService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this.editForm = this.createFormGroup();
  }

  get foodname() { return this.editForm.get('foodname'); }
  get calories() { return this.editForm.get('calories'); }
  get price() { return this.editForm.get('price'); }


  onSubmit() {
    this.editFields.foodname = this.editForm.value.foodname;
    this.editFields.calories = this.editForm.value.calories;
    this.editFields.price = this.editForm.value.price;
    this.ActionSvc.editEntry(this.editFields).subscribe((results) => {
      console.log('Suscribed Results: ', results);
      alert('Menu Updated!');
      this.route.navigate(['/menu']);
    });
  }

  goBack() {
    this.route.navigate(['/menu']);
  }

  removeEntry() {
    if (confirm('Are you sure you want to delete this food entry?')) {
      this.ActionSvc.deleteEntry({
        'foodname' : this.editFields.foodname,
        'calories' : this.editFields.calories,
        'price'    : this.editFields.price
      })
      .subscribe((results) => {
        console.log('Suscribed Results; ', results);
        alert('Food Entry Deleted!');
        this.route.navigate(['/menu']);
      });
    }
  }



  ngOnInit() {
  }
}
