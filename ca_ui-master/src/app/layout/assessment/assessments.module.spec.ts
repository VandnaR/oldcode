import { AssessmentModule } from './assessment.module';

describe('ChartsModule', () => {
    let assessmentModule: AssessmentModule;

    beforeEach(() => {
        assessmentModule = new AssessmentModule();
    });

    it('should create an instance', () => {
        expect(assessmentModule).toBeTruthy();
    });
});
