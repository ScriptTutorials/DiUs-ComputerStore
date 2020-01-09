The proposed DiUS computer store extension is Javascript based (Node.js)

Pricing rules are in object array

------- Interface -------

  Checkout co = new Checkout(pricingRules);

  co.scan(isem1_sku);

  co.scan(isem2_sku);

  ...

  co.total();


------- Usage -------

Firstly, you need to prepare the project:

npm install


In order to run all three given custom scenarios, please run the following npm commands:


npm start --case=1  dev

    # SKUs Scanned: atv, atv, atv, vga Total expected: $249.00

npm start --case=2  dev

    # SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95

npm start --case=3  dev

    # SKUs Scanned: mbp, vga, ipd Total expected: $1949.98


result will be returned in co.total, and also echoed in console


------- Unit tests -------

  npm install -g jasmine

  jasmine init

  jasmine spec/tests.js
