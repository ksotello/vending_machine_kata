/*
	As a vendor
	I want a vending machine that accepts coins
	So that I can collect money from the customer
*/

define([
	'src/currentPurchase',
	'src/cashValidator',
	'src/productSelection'],
function (module, cashValidator, productSelection) {
    describe('The CurrentPurchase Suite', function () {
        var coinsByGram,
        coinsByGramStringVersion;

        beforeEach(function () {
            coinsByGram = {
                'penny'		: 2.5,
                'nickel'	: 5,
                'dime'		: 2.268,
                'quarter'	: 5.67,
                'halfDollar': 11.34,
                'dollar'	: 8.1
            };

            coinsByGramStringVersion = {
                'penny'		: '2.5',
                'nickel'	: '5',
                'dime'		: '2.268',
                'quarter'	: '5.67',
                'halfDollar': '11.34',
                'dollar'	: '8.1'
            };

            module.resetAmount();
            module.isExactChangeOnly(false);
        });

        it('should be defined', function () {
            expect(module).toBeDefined();
        });

        describe('The CurrentCoin Functionality', function () {
            it('should be defined', function () {
                expect(module.currentCoin).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.currentCoin).toEqual(jasmine.any(Function));
            });

            it('should call the cashValidator.validate function', function () {
                spyOn(cashValidator, 'validate');
                module.currentCoin();
                expect(cashValidator.validate).toHaveBeenCalledWith(undefined);
            });

            it('should call the updateAmount functionality if a valid coin was passed in', function () {
                spyOn(module, 'updateAmount');
                module.currentCoin(coinsByGram.dime);
                expect(module.updateAmount).toHaveBeenCalledWith(coinsByGram.dime);
            });

            describe('displaying the INSERT COIN functionality', function () {
                it('should display the INSERT COIN text when no coin is entered', function () {
                    var result = module.currentCoin();
                    expect(result).toEqual('INSERT COIN');
                });

                it('should display the INSERT COIN text when a penny was entered', function () {
                    var result = module.currentCoin(coinsByGramStringVersion.penny);
                    expect(result).toEqual('INSERT COIN');
                });
            });

            describe('Not displaying the INSERT COIN functionality', function () {
                it('should NOT display the INSERT COIN text when a valid coin was entered', function () {
                    var result = module.currentCoin(coinsByGramStringVersion.dime);
                    expect(result).not.toEqual('INSERT COIN');
                });
            });
        });

        describe('The UpdateAmmount Functionality', function () {
            it('should be defined', function () {
                expect(module.updateAmount).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.updateAmount).toEqual(jasmine.any(Function));
            });

            describe('Keeping up to date amount that was placed in the machine', function () {

                it('should return the amount for a dime', function () {
                    var result = module.updateAmount(coinsByGram.dime);
                    expect(result).toEqual(10);
                });

                it('should return the amount for a nickel', function () {
                    var result = module.updateAmount(coinsByGram.nickel);
                    expect(result).toEqual(5);
                });

                it('should return the amount for a quarter', function () {
                    var result = module.updateAmount(coinsByGram.quarter);
                    expect(result).toEqual(25);
                });

                it('should return the amount for a half dollar', function () {
                    var result = module.updateAmount(coinsByGram.halfDollar);
                    expect(result).toEqual(50);
                });

                it('should return the amount for a dollar', function () {
                    var result = module.updateAmount(coinsByGram.dollar);
                    expect(result).toEqual(100);
                });

                it('should return 30 cents when a three dimes and a nickel are passed in', function () {
                    var index,
						result;
                    for (index = 0; index < 3; index++) {
                        result = module.updateAmount(coinsByGram.dime);
                    }
                    reslt = module.updateAmount(coinsByGram.nickel);
                    expect(result).toEqual(30);
                });

                it('should return 100 cents when a quarter a half dollar a nickel, and two dimes', function () {
                    var result;
                    result = module.updateAmount(coinsByGram.quarter);
                    result = module.updateAmount(coinsByGram.halfDollar);
                    reslt = module.updateAmount(coinsByGram.nickel);
                    result = module.updateAmount(coinsByGram.dime);
                    result = module.updateAmount(coinsByGramStringVersion.dime);
                    expect(result).toEqual(100);
                });
            });
        });

        describe('The UpdateCurrentProductSpec', function () {
            it('should be defined', function () {
                expect(module.updateCurrentProduct).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.updateCurrentProduct).toEqual(jasmine.any(Function));
            });

            it('should return the current product name that was selected', function () {
                var result = module.updateCurrentProduct({
                    'productName'	: 'chips',
                    'inventory'		: 20,
                    'isSoldOut'		: false
                });
                expect(result).toEqual(jasmine.any(Object));
            });
        });

        describe('The UpdateAmountNeeded', function () {
            it('should be defined', function () {
                expect(module.updateAmountNeeded).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.updateAmountNeeded).toEqual(jasmine.any(Function));
            });

            it('should return the current product name that was selected', function () {
                var result = module.updateAmountNeeded(65);
                expect(result).toEqual(65);
            });
        });

        describe('The ResetAmountNeeded Functionality', function () {
            it('should be defined', function () {
                expect(module.resetAmountNeeded).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.resetAmountNeeded).toEqual(jasmine.any(Function));
            });

            it('should reset the current amount', function () {
                var result = module.resetAmountNeeded();
                expect(result).toEqual(0.0);
            });
        });

        describe('The ResetCurrentProduct Functionality', function () {
            it('should be defined', function () {
                expect(module.resetCurrentProduct).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.resetCurrentProduct).toEqual(jasmine.any(Function));
            });

            it('should return an empty string when called', function () {
                var result = module.resetCurrentProduct();
                expect(result).toEqual('');
            });
        });

        describe('The ResetAmountNeeded Functionality', function () {
            it('should be defined', function () {
                expect(module.resetAmountNeeded).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.resetAmountNeeded).toEqual(jasmine.any(Function));
            });

            it('should return an empty string when called', function () {
                var result = module.resetAmountNeeded();
                expect(result).toEqual(0.0);
            });
        });

        describe('The OKToDespense Functionality', function () {
            it('should be defined', function () {
                expect(module.okToDespense).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.okToDespense).toEqual(jasmine.any(Function));
            });

            describe('successfully despensing a product', function () {
                it('should return true if amountNeeded has been met', function () {
                    var result;
                    productSelection.currentSelection('A1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    result = module.okToDespense();
                    expect(result).toEqual(true);
                });
            });

            describe('When amount has not been met', function () {
                it('should return false if amount needed has not been met', function () {
                    var result;
                    productSelection.currentSelection('A1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    result = module.okToDespense();
                    expect(result).toBe(false);
                });
            });
        });

        describe('The MakeChange Functionality', function () {
            it('should be defined', function () {
                expect(module.makeChange).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.makeChange).toEqual(jasmine.any(Function));
            });

            describe('When change should be distributed', function () {
                it('should return the correct change', function () {
                    var result;
                    productSelection.currentSelection('C1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    result = module.makeChange();
                    expect(result).toBe(10);
                });

                it('should return the correct change again', function () {
                    var result;
                    productSelection.currentSelection('A1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    result = module.makeChange();
                    expect(result).toBe(50);
                });
            });

            describe('When change should not be distributed', function () {
                it('should return zero if no change is needed to be despensed', function () {
                    var result;
                    productSelection.currentSelection('C1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    module.currentCoin(coinsByGram.quarter);
                    module.currentCoin(coinsByGramStringVersion.dime);
                    module.currentCoin(coinsByGramStringVersion.nickel);
                    result = module.makeChange();
                    expect(result).toBe(0);
                });

                it('should return false if it has not been despensed yet', function () {
                    var result;
                    productSelection.currentSelection('C1');
                    module.currentCoin(coinsByGramStringVersion.quarter);
                    result = module.makeChange();
                    expect(result).toBe(false);
                });
            });
        });

        describe('The CoinReturn Functionality', function () {
            it('should be defined', function () {
                expect(module.coinReturn).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.coinReturn).toEqual(jasmine.any(Function));
            });

            it('should return the amount placed in the machine', function () {
                var result;
                productSelection.currentSelection('C1');
                module.currentCoin(coinsByGramStringVersion.quarter);
                module.currentCoin(coinsByGram.quarter);
                module.currentCoin(coinsByGramStringVersion.dime);
                module.currentCoin(coinsByGramStringVersion.nickel);
                result = module.coinReturn();
                expect(result).toBe(65);
            });

            it('should reset the current amount saved', function () {
                spyOn(module, 'resetAmount');
                productSelection.currentSelection('C1');
                module.currentCoin(coinsByGramStringVersion.quarter);
                module.currentCoin(coinsByGram.quarter);
                module.currentCoin(coinsByGramStringVersion.dime);
                module.currentCoin(coinsByGramStringVersion.nickel);
                module.coinReturn();
                expect(module.resetAmount).toHaveBeenCalled();
            });
        });

        describe('The Despense Functionality', function () {
            it('should be defined', function () {
                expect(module.despense).toBeDefined();
            });

            it('shold be defined as a function', function () {
                expect(module.despense).toEqual(jasmine.any(Function));
            });

            it('should return the current inventory amount for the current product', function () {
                var result;
                productSelection.currentSelection('C1');
                module.currentCoin(coinsByGramStringVersion.quarter);
                module.currentCoin(coinsByGram.quarter);
                module.currentCoin(coinsByGramStringVersion.dime);
                module.currentCoin(coinsByGramStringVersion.nickel);
                result = module.despense();
                expect(result).toBe(19);
            });

            it('should return the current inventory as zero for asold out product', function () {
                var result;
                productSelection.currentSelection('B1');
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                result = module.despense();
                expect(result).toBe(0);
            });

            it('should return not display a negative inventory', function () {
                var result;
                productSelection.currentSelection('B1');
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                result = module.despense();
                expect(result).toBe(0);
            });
        });

        describe('Displaying the SOLD OUT message', function () {
            it('should display the sold out message for a sold out item', function () {
                var result;
                productSelection.currentSelection('B1');
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                module.despense();
                result = productSelection.currentSelection('B1');
                expect(result).toBe('SOLD OUT');
            });
        });

        describe('The isSoldOutProduct Functionality', function () {
            it('should be defined', function () {
                expect(module.isSoldOutProduct).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.isSoldOutProduct).toEqual(jasmine.any(Function));
            });

            it('should return a boolean value', function () {
                var result = module.isSoldOutProduct();
                expect(result).toMatch(/(true|false)/);
            });
        });

        describe('The isExactChangeOnly Functionality', function () {
            it('should be defined', function () {
                expect(module.isExactChangeOnly).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.isExactChangeOnly).toEqual(jasmine.any(Function));
            });

            it('should return a boolean value', function () {
                var result = module.isExactChangeOnly();
                expect(result).toBe(false);
            });

            it('should cause the display to read EXACT CHANGE ONLY if set', function () {
                var result;
                module.isExactChangeOnly(true);
                result = productSelection.currentSelection();
                expect(result).toEqual('EXACT CHANGE ONLY');
            });
        });
    });
});
