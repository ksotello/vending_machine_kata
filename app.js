define([], function () {
    return (function () {

        var coinsByGram = {
            'penny'		: 2.5,
            'nickel'	: 5,
            'dime'		: 2.268,
            'quater'	: 5.67,
            'halfDollar': 11.34,
            'dollar'	: 8.1
        };

        return {
            'validate': function (coinWeight) {
                if (coinWeight				=== undefined ||
					coinWeight				=== coinsByGram.penny ||
					parseFloat(coinWeight)	=== coinsByGram.penny) {
                    return false;
                } else {
                    return true;
                }
            }
        };

    })();
});

define(['src/cashValidator'], function (cashValidator) {
    return (function () {

        var currentPurchase = {
            "currentAmount"				: 0.0,
            "currentProduct"			: '',
            "currentProductInventory"	: 0,
            "isCurrentProductSoldOut"	: false,
            "amountNeeded"				: 0.0,
            "changeNeeded"				: 0.0,
            "isExactChangeOnly"			: false
        },

		coinAmountByWeight = {
            '5'		: 5,
            '2.268'	: 10,
            '5.67'	: 25,
            '11.34'	: 50,
            '8.1'	: 100
        };

        return {

            "currentCoin": function (coinWeight) {
                if (cashValidator.validate(coinWeight)) {
                    return this.updateAmount(coinWeight);
                } else {
                    if (currentPurchase.isExactChangeOnly) {
                        return 'EXACT CHANGE ONLY';
                    } else {
                        return 'INSERT COIN';
                    }
                }
            },

            "updateAmount": function (currentCoin) {
                var currentCoinAmount = currentCoin.toString();
                return currentPurchase.currentAmount += coinAmountByWeight[currentCoinAmount];
            },

            "updateCurrentProduct": function (currentProduct) {
                currentPurchase.currentProduct	= currentProduct.productName;
                currentPurchase.inventory 	   	= currentProduct.inventory;
                currentPurchase.isSoldOut		= currentPurchase.isSoldOut;
                return currentProduct;
            },

            "updateAmountNeeded": function (amountNeeded) {
                currentPurchase.amountNeeded = amountNeeded;
                return currentPurchase.amountNeeded;
            },

            "resetAmount": function () {
                currentPurchase.currentAmount = 0.0;
                return currentPurchase.currentAmount;
            },

            "resetCurrentProduct": function () {
                currentPurchase.currentProduct = '';
                return currentPurchase.currentProduct;
            },

            "resetAmountNeeded": function () {
                currentPurchase.amountNeeded = 0.0;
                return currentPurchase.amountNeeded;
            },

            "okToDespense": function () {
                if (currentPurchase.currentAmount >= currentPurchase.amountNeeded) {
                    currentPurchase.changeNeeded = currentPurchase.currentAmount - currentPurchase.amountNeeded;
                    return true;
                } else {
                    currentPurchase.changeNeeded = 0.0;
                    return false;
                }
            },

            "makeChange": function () {
                if (this.okToDespense()) {
                    return currentPurchase.changeNeeded;
                } else {
                    return false;
                }
            },

            "coinReturn": function () {
                var amountToReturn = currentPurchase.currentAmount;
                this.resetAmount();
                return amountToReturn;
            },

            "despense": function () {
                this.resetAmount();
                this.resetAmountNeeded();
                if (currentPurchase.inventory === 0) {
                    currentPurchase.isSoldOut = true;
                } else if (currentPurchase.inventory < 0) {
                    currentPurchase.inventory = 0;
                } else {
                    currentPurchase.inventory = currentPurchase.inventory - 1;
                }
                return currentPurchase.inventory;
            },

            'isSoldOutProduct': function () {
                if (currentPurchase.isSoldOut) {
                    currentPurchase.isSoldOut = false;
                    return true;
                } else {
                    return false;
                }
            },

            'isExactChangeOnly': function (isExactChange) {
                if (isExactChange === undefined) {
                    currentPurchase.isExactChangeOnly = false;
                } else {
                    currentPurchase.isExactChangeOnly = isExactChange;
                }

                return currentPurchase.isExactChangeOnly;
            }

        };

    })();
});

define(['src/currentPurchase'], function (currentPurchase) {

    return (function () {

        var productSelecionMap = {
            'A1': {
                'productName'	: 'cola',
                'productAmount'	: 100,
                'isSoldOut'		: false,
                'inventory'		: 10
            },
            'B1': {
                'productName'	: 'chips',
                'productAmount'	: 50,
                'isSoldOut'		: false,
                'inventory'		: 5
            },
            'C1': {
                'productNameN'	: 'candy',
                'productAmount'	: 65,
                'isSoldOut'		: false,
                'inventory'		: 20
            }
        };

        return {

            "currentSelection": function (selection) {
                if (productSelecionMap.hasOwnProperty(selection)) {
					if (currentPurchase.isSoldOutProduct()) {
                        return 'SOLD OUT';
                    } else {
						currentPurchase.updateAmountNeeded(productSelecionMap[selection].productAmount);
	                    currentPurchase.updateCurrentProduct({
	                        'productName'	: productSelecionMap[selection].productName,
	                        'inventory'		: productSelecionMap[selection].inventory,
	                        'isSoldOut'		: productSelecionMap[selection].isSoldOut
	                    });
					}
                } else {
                    currentPurchase.resetAmountNeeded();
                    currentPurchase.resetCurrentProduct();
                    return currentPurchase.currentCoin();
                }
            }

        };

    })();

});
