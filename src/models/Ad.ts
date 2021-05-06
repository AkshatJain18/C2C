export class Ad {
  adId: number;
  adType : number;
  adTitle : string;
  productName : string;
  brandName : string;
  categoryId : number;
  description : string;
  initialPrice : number;
  finalPrice : number;
  sellerId : string;
  buyerId: string;
  productAge: string;
  auctionDeadline : string;
  adCreated : string;
  sold:boolean;
  views : number;
  img1Url : string;
  img2Url : string;
  img3Url : string;

  constructor (ad : any) {
    this.adId = ad.adId;
    this.adType = ad.adType;
    this.adTitle = ad.adTitle;
    this.productName = ad.productName;
    this.brandName = ad.brandName;
    this.categoryId = ad.categoryId;
    this.description = ad.description;
    this.initialPrice = ad.initialPrice;
    this.sellerId = ad.sellerId;
    this.buyerId = ad.buyerId;
    this.productAge = ad.productAge;
    this.sold = ad.sold;
    this.auctionDeadline = ad.auctionDeadline;
    this.img1Url = ad.img1Url;
    this.img2Url = ad.img2Url;
    this.img3Url = ad.img3Url;
    this.finalPrice = ad.finalPrice;
    this.adCreated = ad.adCreated;
    this.views = ad.views;
  }
}
