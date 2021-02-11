import { Injectable } from "@angular/core";
import { ISortModel, sortOrder } from "./sorter";

@Injectable()
export class SortService {
    private _dataList! : Array<any>;
    private _sortModel! : ISortModel;
    private _sortOrder = 1;  // Signifies Ascending
    private _collator = Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

    public get dataList(): Array<any> {
        return this._dataList;
    }

    public set dataList(value: Array<any>) {
        this._dataList = value;
        this.applySort();
    }

    public sortData(column: string, dataType: string = '') {
        if (this.canSortByColumn(column)) {
            return;
        }

        if (this._sortModel && this._sortModel.property == column) {
            this._sortModel.order = this._sortModel.order == sortOrder.ascending ? sortOrder.descending : sortOrder.ascending;
        } else {
            this._sortModel = <ISortModel>{ property: column, order: sortOrder.ascending, type: dataType  }
        }

        this.applySort(); 
    }

    private canSortByColumn(column: string): boolean {
        if (!this._dataList || this._dataList.length === 0) {
            return false;
        }
        return this._dataList.findIndex(r => column in r) > 0;
    }

    private applySort() {
        if (!this._sortModel || !this._dataList) {
            return;
        }

        this._dataList.sort(this.compareForSort())
    }
    
    private compareForSort() : any {
        this._sortOrder = this._sortModel.order === sortOrder.descending ? -1 : 1; 
                
        const itemType  = this._sortModel.type;
        const propName: string = this._sortModel.property;

        return (a: any, b: any) =>  {
            if (itemType === 'date') {
                return this.compareAndData(new Date(a[propName]), new Date(b[propName]));
            } else {
                return this._collator.compare(a[propName], b[propName]) * this._sortOrder;
            }
        }
    }

    private compareAndData(a: any, b: any) : any {
        if (a < b) {
            return -1 * this._sortOrder;
        } else if (a > b) {
            return 1 * this._sortOrder;
        } else {
            return 0;
        }
    }
}
