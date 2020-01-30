import { ProjectAdvisoryModule } from './projectadvisory.module';

describe('ChartsModule', () => {
    let ProjectAdvisoryModule: ProjectAdvisoryModule;

    beforeEach(() => {
        ProjectAdvisoryModule = new ProjectAdvisoryModule();
    });

    it('should create an instance', () => {
        expect(ProjectAdvisoryModule).toBeTruthy();
    });
});
