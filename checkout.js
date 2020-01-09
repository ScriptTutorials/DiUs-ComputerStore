const Product = require('./product');
const PricingRuleType = require('./pricing-rules');

// Main Checkout class
class Checkout {

    constructor(rules) {
        // apply specials rules
        this.rules = rules;

        // populate store with products
        this.products = [];
        this.products.push(new Product('ipd', 'Super iPad', 549.99));
        this.products.push(new Product('mbp', 'MacBook Pro', 1399.99));
        this.products.push(new Product('atv', 'Apple TV', 109.50));
        this.products.push(new Product('vga', 'VGA adapter', 30));

        // initialize empty cart
        this.cart = [];
    }

    // add a product into cart
    scan(sku) {
        const skuProducts = this.products.filter(p => {
            return p.sku === sku
        });

        if (skuProducts.length) {
            const product = skuProducts[0];
            this.cart.push({...product });
            console.log(`${product.name} added to cart`);
        } else {
            // wrong SKU was provided
            console.log('no such product');
        }
    }

    // total price calculation using custom pricing rules
    total() {

        var totalSum = 0;

        if (!this.rules.length) { // if no custom pricing rules defined - calculate total price in ordinary way
            this.cart.map(product => {
                if (product.processed == 0) {
                    totalSum += product.price;
                }
            });
        } else { // otherwise - use custom pricing rules

            this.rules.map(rule => {
                switch (rule.rule) {
                    case PricingRuleType.XForY:

                        var skuProducts = this.cart.filter(p => {
                            return p.sku === rule.sku
                        });

                        if (skuProducts.length >= rule.amountReq) { // threshold overcoming
                            const product = skuProducts[0];

                            const repeat = Math.floor(skuProducts.length / rule.amountReq);
                            const remains = skuProducts.length % rule.amountReq;

                            totalSum += (product.price * rule.amount) * repeat + remains * product.price;

                            skuProducts.map(product => {
                                product.processed = 1;
                            });
                        }
                        break;

                    case PricingRuleType.BulkPrice:
                        var skuProducts = this.cart.filter(p => {
                            return p.sku === rule.sku
                        });

                        if (skuProducts.length >= rule.amountReq) { // threshold overcoming
                            totalSum += skuProducts.length * rule.price;

                            skuProducts.map(product => {
                                product.processed = 1;
                            });
                        }
                        break;

                    case PricingRuleType.FreeIf:
                        var skuProducts = this.cart.filter(p => {
                            return p.sku === rule.sku
                        });

                        if (skuProducts.length) { // threshold overcoming
                            // same amount of rule's freeItem will be free

                            var count = 0;
                            var freeProducts = this.cart.filter(p => {
                                return p.sku === rule.freeItem
                            });
                            freeProducts.map(product => {
                                if (count < skuProducts.length) {
                                    product.processed = 1;
                                }
                                count++;
                            });
                        }
                        break;
                }
            });

            this.cart.map(product => {
                if (product.processed == 0) {
                    totalSum += product.price;
                }
            });

        }
        console.log('$ ' + totalSum.toFixed(2));
        return totalSum;
    }
}

module.exports = Checkout;