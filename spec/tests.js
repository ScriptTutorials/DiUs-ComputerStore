const PricingRuleType = require('../pricing-rules');
const Checkout = require('../checkout');


// define custom pricing rules
const pricingRules = [
    { // 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
        rule: PricingRuleType.XForY,
        sku: 'atv',
        amountReq: 3,
        amount: 2
    },
    { // the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
        rule: PricingRuleType.BulkPrice,
        sku: 'ipd',
        amountReq: 4,
        price: 499.99
    },
    { // we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
        rule: PricingRuleType.FreeIf,
        sku: 'mbp',
        freeItem: 'vga'
    }
];

describe("Unit tests", function() {
    it("Check if Checkout is defined", function() {
        let co = new Checkout(pricingRules);
        expect(co).toBeDefined();
    });

    it("SKUs Scanned: atv, atv, atv, vga", function() {

        let co = new Checkout(pricingRules);
        
        // SKUs Scanned: atv, atv, atv, vga
        // Total expected: $249.00
        co.scan('atv');
        co.scan('atv');
        co.scan('atv');
        co.scan('vga');
        
        let result = co.total();

        expect(result).toBe(249);
    });

    it("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd", function() {

        let co = new Checkout(pricingRules);
        
        // SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
        // Total expected: $2718.95
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd');
        
        let result = co.total();

        expect(result).toBe(2718.95);
    });

    it("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd", function() {

        let co = new Checkout(pricingRules);
        
        // SKUs Scanned: mbp, vga, ipd
        // Total expected: $1949.98
        co.scan('mbp');
        co.scan('vga');
        co.scan('ipd');
        
        let result = co.total();

        expect(result).toBe(1949.98);
    });
});
