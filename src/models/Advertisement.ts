export class Advertisement{

    adId:string;
    adTitle:string;
    description:string;
    productName:string;
    initialPrice:number;
    brandName:string;
    adType:number;
    adCreated:string;
    sellerId:string;
    categoryId:number;
    views:number;
    img1Url:string;
    img2Url:string;
    img3Url:string;

    constructor(args:any){
        this.adId = args.adId;
        this.adTitle = args.title;
        this.description = args.description;
        this.productName = args.productName;
        this.adCreated = args.adCreated;
        this.initialPrice = args.initialPrice;
        this.brandName = args.brandName;
        this.adType = args.adType;
        this.sellerId = args.sellerId;
        this.views = args.views;
        this.categoryId = args.categoryId;
        this.img1Url = args.img1Url;
        this.img2Url = args.img2Url;
        this.img3Url = args.img3Url;        
    }
}