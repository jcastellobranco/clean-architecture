export type ProductsProps ={
    id:string,
    name:string,
    description:string,
    price:number;
}


export class Product {
    constructor(public props:ProductsProps){}

    get id(){
        return this.props.id;
    }

    get name(){
        return this.props.name;
    }

    get description(){
        return this.props.description;
    }

    get price(){
        return this.props.price;
    }
}