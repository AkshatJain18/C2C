export class Advertisement{
    title:string;
    initialPrice:number;

    constructor(args:any){
        this.title = args.title;
        this.initialPrice = args.initialPrice;
    }
}