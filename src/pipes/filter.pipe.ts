import { Pipe, PipeTransform } from '@angular/core';
import { Ad } from 'src/models/Ad';
@Pipe({
    name:'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    searchFilter(ads: Ad[], searchKeyword: string){
        if(searchKeyword.length==0){
            return ads;
        }
        searchKeyword = searchKeyword.toLowerCase();
        return ads.filter(
            ad => ad.adTitle.toLowerCase().includes(searchKeyword) 
            || ad.productName.toLowerCase().includes(searchKeyword) 
            || ad.description.toLowerCase().includes(searchKeyword)
        )
    }

    adTypeFilter(ads:Ad[],adType:number){
        return ads.filter(ad=>ad.adType == adType);
    }

    categoriesFilter(ads:Ad[],selectedCategories:any[]){
        console.log(selectedCategories);
        if(selectedCategories.length == 0){
            return ads;
        }
        
        return ads.filter(
            ad => selectedCategories.includes((c:any)=>c.categoryId==ad.categoryId)
        )
    }

    priceFilter(ads:Ad[],startPrice:number,endPrice:number){
        return ads.filter(
            ad => ad.initialPrice>=startPrice && ad.initialPrice<=endPrice
        )
    }

    transform(ads: Ad[], searchKeyword: string, adType:number,selectedCategories:any[],startPrice:number,endPrice:number): any[]{     
        ads = this.searchFilter(ads,searchKeyword);
        ads = this.categoriesFilter(ads,selectedCategories);
        console.log(ads);
        ads = this.adTypeFilter(ads,adType);
        ads = this.priceFilter(ads,startPrice,endPrice);

        return ads;
    }
}