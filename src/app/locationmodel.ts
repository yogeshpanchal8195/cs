export class LocationModel{
    branches: Array<BranchModel>
    dealers_id: string
    name: string
    opco: string
}

export class BranchModel{
    branch_id: string
    categories: Array<CategoryModel>
    name: string
}

export class CategoryModel{
    image: string
    name: string
    subcategories:Array<CategoryModel>
}
