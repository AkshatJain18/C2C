export class Advertisement{

    adTitle:string;
    adDescription:string;
    productName:string;
    initialPrice:number;
    brandName:string;
    adType:number;
    sellerId:string;
    categoryId:number;
    img1Url:string;
    img2Url:string;
    img3Url:string;

    constructor(args:any){
        this.adTitle = args.title;
        this.adDescription = args.description;
        this.productName = args.productName;
        this.initialPrice = args.initialPrice;
        this.brandName = args.brandName;
        this.adType = args.adType;
        this.sellerId = args.sellerId;
        this.categoryId = args.categoryId;
        this.img1Url = args.img1Url;
        this.img2Url = args.img2Url;
        this.img3Url = args.img3Url;        
    }
}