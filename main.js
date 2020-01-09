const PricingRuleType = require('./pricing-rules');
const Checkout = require('./checkout');

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

const co = new Checkout(pricingRules);
const testingCase = +process.env.npm_config_case;

switch (testingCase) {
    case 1:
        // SKUs Scanned: atv, atv, atv, vga
        // Total expected: $249.00
        co.scan('atv');
        co.scan('atv');
        co.scan('atv');
        co.scan('vga');
        break;
    case 2:
        // SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
        // Total expected: $2718.95
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd');
        break;
    case 3:
        // SKUs Scanned: mbp, vga, ipd
        // Total expected: $1949.98
        co.scan('mbp');
        co.scan('vga');
        co.scan('ipd');
        break;
    default:
        // other custom cases
        break;
}

co.total();