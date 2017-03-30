"use strict";
const acceptedCoins = require('../src/app').AcceptedCoins;
const VendingMachine = require('../src/app').VendingMachine;
const products = require('../src/app').products;

describe("coins have a constant value", () => {
    it("a nickel should have a value of .05", () => {
        expect(acceptedCoins.nickel.value).toBe(.05)
    });
    it("a dime should have a value of .1", () => {
        expect(acceptedCoins.dime.value).toBe(.1)
    });
    it("a quarter should have a value of .25", () => {
        expect(acceptedCoins.quarter.value).toBe(.25)
    });

});

describe("vending machine display", () => {
    it("should display 'INSERT COIN' when no coins have been inserted", () => {
        let vm = new VendingMachine();

        vm.availableCredit = 0;

        expect(vm.displayMessage).toBe('INSERT COIN');

    });

    it("should not display 'INSERT COIN' when coins have been inserted", () => {
        let vm = new VendingMachine();

        let validQuarter = {
            "weight": .3
        };

        vm.addCredit([validQuarter]);

        expect(vm.displayMessage).not.toBe('INSERT COIN');

    });

    it("should display available credit when valid coins have been inserted", () => {
        let vm = new VendingMachine();

        let validQuarter = {
            "weight": .3
        };

        vm.addCredit([validQuarter]);

        expect(vm.displayMessage).toBe(0.25);

    });

});

describe("vending machine assigns value to valid coins", () => {

    it("it evaluates a nickel to be .05", () => {
        let vm = new VendingMachine();

        let coinsAdded = makeCoins(1, .24);

        vm.addCredit(coinsAdded);

        expect(vm.displayMessage).toBe(.05);
    });

    it("it evaluates a dime to be .10", () => {
        let vm = new VendingMachine();

        let coinsAdded = makeCoins(1, .13);
        vm.addCredit(coinsAdded);

        expect(vm.displayMessage).toBe(.10);
    });

    it("it evaluates a quarter to be .25", () => {
        let vm = new VendingMachine();

        let coinsAdded = makeCoins(1, .3);

        vm.addCredit(coinsAdded);

        expect(vm.displayMessage).toBe(.25);
    });


});


describe("vending machine rejects invalid coins", () => {
    it("does not accept pennies", () => {
        let vm = new VendingMachine();

        let invalidCoin = {
            "weight": .001
        };

        vm.updateCredit([invalidCoin]);
        expect(vm.displayMessage).toBe("INSERT COIN");
    });

});

describe("when a valid coin is inserted, it will increase available credit by its amount", () => {

    it("increases available credit when one coin is inserted", () => {
        let vm = new VendingMachine();

        let coinsAdded = [{
            "weight": .3
        }];

        vm.addCredit(coinsAdded);

        expect(vm.availableCredit).toBe(0.25);
    });

    it("does not increase available credit when invalid coin is inserted", () => {
        let vm = new VendingMachine();

        let validQuarter = {
            "weight": .3
        };

        let invalidCoin = {
            "weight": .3153445
        };

        vm.addCredit([validQuarter, invalidCoin]);

        expect(vm.availableCredit).toBe(0.25);
    });

    it("increases available credit correctly when multiple valid coins are added", () => {
        let vm = new VendingMachine();

        let validQuarter = {
            "weight": .3
        };

        let validNickel = {
            "weight": .24
        };

        vm.addCredit([validQuarter, validNickel]);

        expect(vm.availableCredit).toBe(0.3);
    });


});

describe("vending machine products", () => {
    it("should have a location and a price", () => {
        expect(products.chips.price).toBe('0.50');
        expect(products.candy.price).toBe('0.65');
        expect(products.cola.price).toBe('1.00');

        expect(products.chips.cell).toBe('A1');
        expect(products.candy.cell).toBe('B2');
        expect(products.cola.cell).toBe('C3');

    });

    it("should dispense product", () => {
        let vm = new VendingMachine();

        vm.addCredit(makeCoins(4, .3));

        expect(vm.dispense('C3')).toBe("Item dispensed");

    });

    it("should only dispense product if enough credit is available", () => {
        let vm = new VendingMachine();


        vm.addCredit(makeCoins(3, .3));

        expect(vm.dispense('C3')).toBe("Not enough credit");
        expect(vm.dispense('B2')).toBe("Item dispensed");

    });

    it("should dispense multiple products if credit is available", () => {
        let vm = new VendingMachine();


        vm.addCredit(makeCoins(4, .3));

        expect(vm.dispense('A1')).toBe("Item dispensed");
        expect(vm.dispense('A1')).toBe("Item dispensed");

    });

    it("should have correct remaining credit after item is purchased", () => {
        let vm = new VendingMachine();


        vm.addCredit(makeCoins(5, .3));

        vm.dispense('A1');
        expect(vm.displayMessage).toBe(0.75);
        vm.dispense('B2');
        expect(vm.displayMessage).toBe(0.10);

    });


});


function makeCoins(number, weight) {
    let coinsAdded = [];
    while (number > 0) {
        coinsAdded.push({"weight" : weight});
        number--;
    }
    return coinsAdded;
}