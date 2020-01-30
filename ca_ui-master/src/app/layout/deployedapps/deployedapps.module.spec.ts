import { DeployedAppsModule } from './deployedapps.module';

describe('ChartsModule', () => {
    let autodeployModule: DeployedAppsModule;

    beforeEach(() => {
        autodeployModule = new DeployedAppsModule();
    });

    it('should create an instance', () => {
        expect(autodeployModule).toBeTruthy();
    });
});
