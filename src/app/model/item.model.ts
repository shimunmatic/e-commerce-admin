export interface Item {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    thumbnail: string;
    categoryId: number;
    variants: ItemVariant[];
    itemMedia: ItemMedia[];
}

export class ItemVariant {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    itemId: number;
    thumbnail: string;
}

export interface ItemMedia {
    id: number;
    name: string;
    path: string;
    type: number;
    itemId: number;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PageableContent<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
