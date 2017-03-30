"use strict";

const acceptedCoins = {
    "nickel": {
        weight: .24,
        value: .05
    },

    "dime": {
        weight: .13,
        value: .10
    },

    "quarter": {
        weight: .3,
        value: .25
    },

};

let products = {
    "chips": {
        cell: "A1",
        price: "0.50",
    },
    "candy": {
        cell: "B2",
        price: "0.65"
    },
    "cola": {
        cell: "C3",
        price: "1.00"
    }
}


function VendingMachine() {
    this.availableCredit = 0;
    this.valueOfLastCoinAdded = 0;
    this.displayMessage = 'INSERT COIN';

}


VendingMachine.prototype.assignsCorrectValue = function (coinAdded) {
    for (let acceptedCoin in acceptedCoins) {
        if (acceptedCoins[acceptedCoin].weight === coinAdded.weight) {
            return this.valueOfLastCoinAdded = acceptedCoins[acceptedCoin].value;
        }
    }
};


VendingMachine.prototype.addCredit = function (coinsAdded) {
    for (let i = 0; i < coinsAdded.length; i++) {
        if (this.assignsCorrectValue(coinsAdded[i])) {
            this.availableCredit += this.valueOfLastCoinAdded;
            this.updateDisplay();
        }
    }
};


VendingMachine.prototype.updateDisplay = function () {
    if (this.availableCredit > 0) {
        this.displayMessage = this.availableCredit;
    }
};

VendingMachine.prototype.updateCredit = function (product) {
    this.availableCredit -= product.price;
    this.availableCredit = parseFloat(this.availableCredit.toFixed(2))
};


VendingMachine.prototype.sufficientCredit = function(product) {
    return this.availableCredit >= products[product].price;
};

VendingMachine.prototype.cellMatches = function(product, cell) {
    return products[product].cell === cell;
};

VendingMachine.prototype.dispense = function (cell) {
    for (let product in products) {
        if (this.cellMatches(product, cell) && this.sufficientCredit(product)) {
            this.updateCredit(products[product]);
            this.updateDisplay();
            return "Item dispensed";
        }
    }
    return "Not enough credit";
};


module.exports = {
    AcceptedCoins: acceptedCoins,
    VendingMachine: VendingMachine,
    products: products
};