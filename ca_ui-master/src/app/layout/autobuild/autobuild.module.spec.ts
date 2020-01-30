import { AutoBuildModule } from './autobuild.module';

describe('ChartsModule', () => {
    let AutoBuildModule: AutoBuildModule;

    beforeEach(() => {
        AutoBuildModule = new AutoBuildModule();
    });

    it('should create an instance', () => {
        expect(AutoBuildModule).toBeTruthy();
    });
});
