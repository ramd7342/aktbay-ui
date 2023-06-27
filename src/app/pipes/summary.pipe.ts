import {Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'summaryPipe'})
@Injectable()
export class SummaryPipe implements PipeTransform {
    transform(items: any, filterString:string): any {
        if (!items || !filterString) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter((item: any) => item.storySummary.toLowerCase().indexOf(filterString.toLowerCase()) !== -1);
    }
}