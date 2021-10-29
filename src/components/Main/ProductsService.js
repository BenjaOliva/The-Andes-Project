
export class ProductService {

    getProductsSmall() {
        return fetch('data/recipes.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('data/recipes.json').then(res => res.json()).then(d => d.data);
    }

}
    