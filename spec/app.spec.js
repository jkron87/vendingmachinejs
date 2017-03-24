"use strict";
const acceptedCoins = require('../src/app').AcceptedCoins;
const VendingMachine = require('../src/app').VendingMachine;

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

describe("vending machine assigns value to valid coins", () => {
    it("accepts nickels", () => {
        let vm = new VendingMachine();

        let nickelAdded = {
            "weight": .24
        };

        expect(vm.assignsCorrectValue(nickelAdded)).not.toBe(null);
    });

    it("accepts dimes", () => {
        let vm = new VendingMachine();

        let dimeAdded = {
            "weight": .13
        };

        expect(vm.assignsCorrectValue(dimeAdded)).not.toBe(null);
    });


    it("it evaluates a nickel to be .05", () => {
        let vm = new VendingMachine();

        let nickelAdded = {
            "weight": .24
        };

        vm.assignsCorrectValue(nickelAdded);

        expect(vm.valueOfLastCoinAdded).toBe(.05);
    });

    it("it evaluates a dime to be .10", () => {
        let vm = new VendingMachine();

        let dimeAdded = {
            "weight": .13
        };

        vm.assignsCorrectValue(dimeAdded);

        expect(vm.valueOfLastCoinAdded).toBe(.10);
    });

    it("it evaluates a quarter to be .25", () => {
        let vm = new VendingMachine();

        let quarterAdded = {
            "weight": .3
        };

        vm.assignsCorrectValue(quarterAdded);

        expect(vm.valueOfLastCoinAdded).toBe(.25);
    });


});

describe("vending machine rejects invalid coins", () => {
    it("does not accept pennies", () => {
        let vm = new VendingMachine();

        let coinAdded = {
            "weight": .001
        };

        expect(vm.assignsCorrectValue(coinAdded)).toBe(false);
    });

});


describe("when a valid coin is inserted, it will increase available credit by its amount", () => {
    it("increases available credit when one coin is inserted", () => {
        let vm = new VendingMachine();

        let quarterAdded = {
            "weight": .3
        };

        vm.assignsCorrectValue(quarterAdded);
        vm.updateCredit(quarterAdded);

        expect(vm.assignsCorrectValue(quarterAdded)).toBe(true);
        expect(vm.availableCredit).toBe(0.25);
    });

    it("does not increase available credit when invalid coin is inserted", () => {
        let vm = new VendingMachine();

        let validQuarter = {
            "weight": .3
        };

        let invalidCoin = {
            "weight": .3453445
        };


        vm.assignsCorrectValue(invalidCoin);
        vm.assignsCorrectValue(validQuarter);
        vm.updateCredit(invalidCoin);
        vm.updateCredit(validQuarter);

        expect(vm.assignsCorrectValue(invalidCoin)).toBe(false);
        expect(vm.assignsCorrectValue(validQuarter)).toBe(true);
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


        vm.assignsCorrectValue(validNickel);
        vm.assignsCorrectValue(validQuarter);
        vm.updateCredit(validNickel);
        vm.updateCredit(validQuarter);

        expect(vm.assignsCorrectValue(validNickel)).toBe(true);
        expect(vm.assignsCorrectValue(validQuarter)).toBe(true);
        expect(vm.availableCredit).toBe(0.3);
    });

    describe("vending machine display", () => {
        it("should display 'INSERT COIN' when no coins have been inserted", () => {
            let vm = new VendingMachine();
            vm.availableCredit = 0;

            expect(vm.displayMessage).toBe('INSERT COIN');

        });

        it("should not display 'INSERT COIN' when no coins have been inserted", () => {
            let vm = new VendingMachine();
            let validQuarter = {
                "weight": .3
            };

            vm.assignsCorrectValue(validQuarter);
            vm.updateCredit(validQuarter);



            expect(vm.displayMessage).toBe('');

        });

    });


});