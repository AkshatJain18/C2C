import { Pipe, PipeTransform } from '@angular/core';
import { Advertisement } from 'src/models/Advertisement';
@Pipe({
    name:'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    searchFilter(ads: Advertisement[], searchKeyword: string){
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

    adTypeFilter(ads:Advertisement[],adType:number){
        return ads.filter(ad=>ad.adType == adType);
    }

    categoriesFilter(ads:Advertisement[],selectedCategories:any[]){
        console.log(selectedCategories);
        if(selectedCategories.length == 0){
            return ads;
        }
        
        return ads.filter(
            ad => selectedCategories.includes((c:any)=>c.categoryId==ad.categoryId)
        )
    }

    priceFilter(ads:Advertisement[],startPrice:number,endPrice:number){
        return ads.filter(
            ad => ad.initialPrice>=startPrice && ad.initialPrice<=endPrice
        )
    }

    transform(ads: Advertisement[], searchKeyword: string, adType:number,selectedCategories:any[],startPrice:number,endPrice:number): any[]{     
        ads = this.searchFilter(ads,searchKeyword);
        ads = this.categoriesFilter(ads,selectedCategories);
        ads = this.adTypeFilter(ads,adType);
        ads = this.priceFilter(ads,startPrice,endPrice);

        return ads;
    }
}