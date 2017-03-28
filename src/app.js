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
            this.valueOfLastCoinAdded = acceptedCoins[acceptedCoin].value;
            return true;
        }
    }
    return false;
};


VendingMachine.prototype.updateCredit = function (coinsAdded) {
    for (let i = 0; i < coinsAdded.length; i++) {
        if (this.assignsCorrectValue(coinsAdded[i])) {
            this.availableCredit += this.valueOfLastCoinAdded;
            this.updateDisplay();
        }

    }
};

VendingMachine.prototype.updateDisplay = function () {
    this.displayMessage = '';
};

VendingMachine.prototype.dispense = function (cell) {
    for (let product in products) {
        if (products[product].cell === cell && this.availableCredit >= products[product].price) {
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