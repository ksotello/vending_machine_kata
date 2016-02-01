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
