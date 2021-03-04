export interface Category {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    parentId?: number;
    subCategories: Category[];
}