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


VendingMachine.prototype.updateCredit = function (coinAdded) {
    if (this.assignsCorrectValue(coinAdded)) {
        this.availableCredit += this.valueOfLastCoinAdded;
        this.updateDisplay();
    }
};

VendingMachine.prototype.updateDisplay= function () {
        this.displayMessage = '';
};


module.exports = {
    AcceptedCoins: acceptedCoins,
    VendingMachine: VendingMachine
};