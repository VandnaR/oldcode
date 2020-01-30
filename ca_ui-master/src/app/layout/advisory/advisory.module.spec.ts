import { AdvisoryModule } from './advisory.module';

describe('ChartsModule', () => {
    let advisoryModule: AdvisoryModule;

    beforeEach(() => {
        advisoryModule = new AdvisoryModule();
    });

    it('should create an instance', () => {
        expect(advisoryModule).toBeTruthy();
    });
});
