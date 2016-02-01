/*
	As a vendor
	I want customers to select products
	So that I can give them an incentive to put money in the machine
*/
define(['src/productSelection', 'src/currentPurchase'], function (module, currentPurchase) {
    describe('The ProductSelection Suite', function () {
        var productSelecionMap;

        beforeEach(function () {
            productSelecionMap = {
                'A1': {
                    'productName'	: 'cola',
                    'productAmount'	: 100
                },
                'B1': {
                    'productName'	: 'chips',
                    'productAmount'	: 50
                },
                'C1': {
                    'productNameN'	: 'candy',
                    'productAmount'	: 65
                }
            };

			currentPurchase.isExactChangeOnly(false);
        });

        it('should be defined', function () {
            expect(module).toBeDefined();
        });

        describe('The CurrentSelection Functionality', function () {
            it('should be defined', function () {
                expect(module.currentSelection).toBeDefined();
            });

            it('should be defined as a function', function () {
                expect(module.currentSelection).toEqual(jasmine.any(Function));
            });

            describe('A Valid Selection', function () {
                it('should call the currentPurchase.updateAmountNeeded function for a valid selection', function () {
                    spyOn(currentPurchase, 'updateAmountNeeded');
                    module.currentSelection('A1');
                    expect(currentPurchase.updateAmountNeeded).toHaveBeenCalledWith(productSelecionMap.A1.productAmount);
                });

                it('should call the currentPurchase.updateCurrentProduct function for a valid selection', function () {
                    spyOn(currentPurchase, 'updateCurrentProduct');
                    module.currentSelection('C1');
                    expect(currentPurchase.updateCurrentProduct).toHaveBeenCalledWith(jasmine.any(Object));
                });
            });

            describe('An Invalid selection', function () {
                it('should call the currentPurchase.resetAmountNeeded functionality for an invalid selection', function () {
                    spyOn(currentPurchase, 'resetAmountNeeded');
                    module.currentSelection('H7');
                    expect(currentPurchase.resetAmountNeeded).toHaveBeenCalled();
                });

                it('should call the currentPurchase.resetCurrentProduct functionality for an invalid selection', function () {
                    spyOn(currentPurchase, 'resetCurrentProduct');
                    module.currentSelection('U7');
                    expect(currentPurchase.resetCurrentProduct).toHaveBeenCalled();
                });

                it('return the INSERT COIN text if no selection was made', function () {
                    var result = module.currentSelection();
                    expect(result).toEqual('INSERT COIN');
                });
            });
        });
    });
});
