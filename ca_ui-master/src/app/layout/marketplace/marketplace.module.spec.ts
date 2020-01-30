import { MarketplaceModule } from './marketplace.module';

describe('ChartsModule', () => {
    let marketplaceModule: MarketplaceModule;

    beforeEach(() => {
        marketplaceModule = new MarketplaceModule();
    });

    it('should create an instance', () => {
        expect(marketplaceModule).toBeTruthy();
    });
});
