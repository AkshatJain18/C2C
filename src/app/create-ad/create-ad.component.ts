import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ad } from '../../model/Ad';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  createAdForm !: FormGroup;

  categories : string[] = ['Vehicle', 'Mobile', 'Job', 'Apartment', 'Electronics','Accessories','Fashion','Others']

  isSell = true;
  isAuction = false;
  isDonate = false;

  // private auctionValidators = [];
  // private sellValidators = [];
  //public requiredValidator = [Validators.required];

  constructor(private formBuiler : FormBuilder) {
    this.buildCreateAdForm(new Ad({}));
   }

  ngOnInit(): void {
    this.createAdForm.get('adType')?.setValue(1);
    this.createAdForm.get('adType')?.updateValueAndValidity();
  }

  buildCreateAdForm(ad:Ad) {
    this.createAdForm = new FormGroup({
      adType : new FormControl(ad.adType, Validators.required),
      adTitle : new FormControl(ad.adTitle,[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      productName : new FormControl(ad.productName, [Validators.required, Validators.maxLength(15)]),
      categoryId : new FormControl(ad.categoryId,Validators.required),
      adDescription : new FormControl(ad.adDescription, [Validators.required, Validators.maxLength(30)]),
      sellingPrice : new FormControl(ad.sellingPrice),
      startingBidPrice : new FormControl(ad.startingBidPrice),
      sellerEmailId : new FormControl(ad.sellerEmailId, [Validators.email,Validators.required]),
      boughtOn : new FormControl(ad.boughtOn),
      auctionDays : new FormControl(ad.auctionDays)
    })
  }

  toggleAdType(type: number) {
    this.buildCreateAdForm(new Ad({}));
    if(type===1) {
      this.isSell = true;
      this.isAuction = false;
      this.isDonate = false;
    }
    else if(type===2) {
      this.isAuction = true;
      this.isDonate = false;
      this.isSell = false;
    }
    else {
      this.isDonate = true;
      this.isSell = false;
      this.isAuction = false;
    }
    this.createAdForm.get('adType')?.setValue(type);
    this.createAdForm.get('adType')?.updateValueAndValidity();
    this.setConditionalValidators;
  }

  onSubmit() {
    console.log(this.createAdForm.value);
  }

  setConditionalValidators() {
    if(this.isSell) {
      this.createAdForm.get('sellingPrice')?.setValidators(Validators.required);
      this.createAdForm.get('startingBidPrice')?.setValidators(null);
    }
    if(this.isAuction) {
      this.createAdForm.get('sellingPrice')?.setValidators(null);
      this.createAdForm.get('startingBidPrice')?.setValidators(Validators.required);
    }
    this.createAdForm.get('sellingPrice')?.updateValueAndValidity();
    this.createAdForm.get('startingBidPrice')?.updateValueAndValidity();
  }


}
