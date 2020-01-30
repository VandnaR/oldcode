import { AutoDeployModule } from './autodeploy.module';

describe('ChartsModule', () => {
    let autodeployModule: AutoDeployModule;

    beforeEach(() => {
        autodeployModule = new AutoDeployModule();
    });

    it('should create an instance', () => {
        expect(autodeployModule).toBeTruthy();
    });
});
