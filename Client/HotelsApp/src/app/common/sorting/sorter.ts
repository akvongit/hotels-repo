export enum sortOrder {
    ascending = 1,
    descending = 2
}

export interface ISortModel {
    property: string,
    order: sortOrder,
    type?: string
}