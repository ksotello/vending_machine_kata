define(['src/cashValidator'], function (module) {
    describe('The Cash Validator Suite', function () {
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
        });

        it('should be defined', function () {
            expect(module).toBeDefined();
        });

        describe('The Validate Functionality', function () {
            it('should be defined', function () {
                expect(module.validate).toBeDefined();
            });

            it('should be defined as a functon', function () {
                expect(module.validate).toEqual(jasmine.any(Function));
            });

            describe('Failing Functionality', function () {
                it('should return false is no coin weight was passed in', function () {
                    var result = module.validate();
                    expect(result).toBe(false);
                });

                it('should return false if a penny was placed', function () {
                    var result = module.validate(coinsByGram.penny);
                    expect(result).toBe(false);
                });

                it('should return false if a penny was placed, value as a string', function () {
                    var result = module.validate(coinsByGramStringVersion.penny);
                    expect(result).toBe(false);
                });
            });

            describe('Passing Functionality', function () {
                it('should return true if a dime was placed in', function () {
                    var result = module.validate(coinsByGram.dime);
                    expect(result).toBe(true);
                });

                it('should return true if a quarter was placed in', function () {
                    var result = module.validate(coinsByGram.quarter);
                    expect(result).toBe(true);
                });

                it('should return true if a half dollar was placed in', function () {
                    var result = module.validate(coinsByGram.halfDollar);
                    expect(result).toBe(true);
                });

                it('should return true if a dollar was placed in', function () {
                    var result = module.validate(coinsByGram.dollar);
                    expect(result).toBe(true);
                });

                describe('passing functionality if a string wieght was passed in', function () {
                    it('should return true if a dime was placed in', function () {
                        var result = module.validate(coinsByGramStringVersion.dime);
                        expect(result).toBe(true);
                    });

                    it('should return true if a quarter was placed in', function () {
                        var result = module.validate(coinsByGramStringVersion.quarter);
                        expect(result).toBe(true);
                    });

                    it('should return true if a half dollar was placed in', function () {
                        var result = module.validate(coinsByGramStringVersion.halfDollar);
                        expect(result).toBe(true);
                    });

                    it('should return true if a dollar was placed in', function () {
                        var result = module.validate(coinsByGramStringVersion.dollar);
                        expect(result).toBe(true);
                    });
                });
            });

        });
    });
});
