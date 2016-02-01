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
