// Single product
class Product {
    constructor(sku, name, price) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.processed = 0;
    }
}

module.exports = Product;