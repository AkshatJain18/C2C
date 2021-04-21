export class Ad {
  adType : number;
  adTitle : string;
  productName : string;
  brandName : string;
  categoryId : number;
  description : string;
  initialPrice : number;
  currentBidPrice : string;
  sellerId : number;
  productAge: string;
  auctionDuration : number;
  adCreated : string;
  viewCount : number;
  img1Url : string;
  img2Url : string;
  img3Url : string;

  constructor (ad : any) {
    this.adType = ad.adType;
    this.adTitle = ad.adTitle;
    this.productName = ad.productName;
    this.brandName = ad.brandName;
    this.categoryId = ad.categoryId;
    this.description = ad.description;
    this.initialPrice = ad.initialPrice;
    this.sellerId = ad.sellerId;
    this.productAge = ad.productAge;
    this.auctionDuration = ad.auctionDuration;
    this.img1Url = ad.img1Url;
    this.img2Url = ad.img2Url;
    this.img3Url = ad.img3Url;
    this.currentBidPrice = ad.currentBidPrice;
    this.adCreated = ad.adCreated;
    this.viewCount = ad.viewCount;
  }
}
