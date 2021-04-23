export class Ad {
  adId: number;
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
  auctionDeadline : string;
  adCreated : string;
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
    this.productAge = ad.productAge;
    this.auctionDeadline = ad.auctionDeadline;
    this.img1Url = ad.img1Url;
    this.img2Url = ad.img2Url;
    this.img3Url = ad.img3Url;
    this.currentBidPrice = ad.currentBidPrice;
    this.adCreated = ad.adCreated;
    this.views = ad.views;
  }
}
