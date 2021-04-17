export class Ad {
  adType : number;
  adTitle : string;
  productName : string;
  categoryId : number;
  adDescription : string;
  sellingPrice : number;
  startingBidPrice : number;
  sellerEmailId : string;
  boughtOn: string;
  auctionDays : number;

  constructor (ad : any) {
    this.adType = ad.adType;
    this.adTitle = ad.adTitle;
    this.productName = ad.productName;
    this.categoryId = ad.categoryId;
    this.adDescription = ad.adDescription;
    this.sellingPrice = ad.sellingPrice;
    this.startingBidPrice = ad.startingBidPrice;
    this.sellerEmailId = ad.sellerEmailId;
    this.boughtOn = ad.boughtOn;
    this.auctionDays = ad.auctionDays;
  }
}
