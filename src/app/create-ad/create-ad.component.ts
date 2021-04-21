import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ad } from '../../model/Ad';
import axios from 'axios';

enum typeOfAd {
  donate = 1,
  sell = 2,
  auction = 3
}

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  createAdForm !: FormGroup;

  categories : string[] = ['Vehicle', 'Mobile', 'Job', 'Apartment', 'Electronics','Accessories','Fashion','Others'];

  adTypes = typeOfAd;

  isSell = true;
  isAuction = false;
  isDonate = false;

  image1Selected = false;
  image2Selected = false;
  image3Selected = false;
  image1Touched = false;

  url1 = "";
  url2 = "";
  url3 = "";

  CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/hashedin/upload";
  CLOUDINARY_UPLOAD_PRESET = "cbtxrrbg";

  constructor(private formBuiler : FormBuilder) {
    this.buildCreateAdForm(new Ad({}));

   }

  ngOnInit(): void {
    this.createAdForm.get('adType')?.setValue(this.adTypes.sell);
    this.createAdForm.get('auctionDuration')?.setValue(0);
    //this.createAdForm.get('adType')?.updateValueAndValidity();
  }

  buildCreateAdForm(ad:Ad) {
    this.createAdForm = new FormGroup({
      adType : new FormControl(ad.adType, Validators.required),
      adTitle : new FormControl(ad.adTitle,[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      productName : new FormControl(ad.productName, [Validators.required, Validators.maxLength(15)]),
      brandName : new FormControl(ad.brandName, [Validators.required, Validators.maxLength(15)]),
      categoryId : new FormControl(ad.categoryId,Validators.required),
      description : new FormControl(ad.description, [Validators.required, Validators.maxLength(30)]),
      initialPrice : new FormControl(ad.initialPrice,Validators.required),
      // sellerId : new FormControl(ad.sellerId,Validators.required),
      productAge : new FormControl(ad.productAge),
      auctionDuration : new FormControl(ad.auctionDuration,Validators.required),
      img1Url : new FormControl(ad.img1Url,Validators.required),
      img2Url : new FormControl(ad.img2Url),
      img3Url : new FormControl(ad.img3Url)
    })
  }

  toggleAdType(type: number) {
    this.buildCreateAdForm(new Ad({}));
    this.removeImage(1);
    this.removeImage(2);
    this.removeImage(3);
    if(type===this.adTypes.sell) {
      this.isSell = true;
      this.isAuction = false;
      this.isDonate = false;
      this.createAdForm.get('auctionDuration')?.setValue(0);
    }
    else if(type===this.adTypes.auction) {
      this.isAuction = true;
      this.isDonate = false;
      this.isSell = false;
    }
    else {
      this.isDonate = true;
      this.isSell = false;
      this.isAuction = false;
      this.createAdForm.get('initialPrice')?.setValue(0);
      this.createAdForm.get('auctionDuration')?.setValue(0);
    }
    this.createAdForm.get('adType')?.setValue(type);
    //this.createAdForm.get('adType')?.updateValueAndValidity();
    //this.setConditionalValidators;
  }

  onSubmit() {
    console.log(this.createAdForm.value);
  }

  onSelectFile1(e:any) {
    var file = e.target.files[0];
    var formData = new FormData;
    formData.append('file',file);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
    this.image1Touched = true
    axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
      }).then((res) => {
        console.log(res);
        this.image1Selected = true;
        this.url1 = res.data.secure_url;
        this.createAdForm.get('img1Url')?.setValue(this.url1);
      }).catch(function(err) {
        console.log(err);
      });
  }

  onSelectFile2(e:any) {
    var file = e.target.files[0];
    var formData = new FormData;
    formData.append('file',file);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
      }).then((res) => {
        console.log(res);
        this.image2Selected = true;
        this.url2 = res.data.secure_url;
        this.createAdForm.get('img2Url')?.setValue(this.url2);
      }).catch(function(err) {
        console.log(err);
      });
  }

  onSelectFile3(e:any) {
    var file = e.target.files[0];
    var formData = new FormData;
    formData.append('file',file);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
      }).then((res) => {
        console.log(res);
        this.image3Selected = true;
        this.url3 = res.data.secure_url;
        this.createAdForm.get('img3Url')?.setValue(this.url3);
      }).catch(function(err) {
        console.log(err);
      });
  }

  removeImage(i:number) {
    if(i===1) {
      this.image1Selected = false;
      this.url1 = "";
      this.createAdForm.get('img1Url')?.setValue(this.url1);
    }
    else if(i===2) {
      this.image2Selected = false;
      this.url2 = "";
      this.createAdForm.get('img2Url')?.setValue(this.url2);
    }
    else {
      this.image3Selected = false;
      this.url3 = "";
      this.createAdForm.get('img3Url')?.setValue(this.url3);
    }

  }



}
