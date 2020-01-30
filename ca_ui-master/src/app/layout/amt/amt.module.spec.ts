import { AMTModule } from './amt.module';

describe('ChartsModule', () => {
    let aMTModule: AMTModule;

    beforeEach(() => {
        aMTModule = new AMTModule();
    });

    it('should create an instance', () => {
        expect(aMTModule).toBeTruthy();
    });
});
