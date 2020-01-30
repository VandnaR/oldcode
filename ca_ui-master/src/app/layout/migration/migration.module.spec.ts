import { MigrationModule } from './migration.module';

describe('ChartsModule', () => {
    let MigrationModule: MigrationModule;

    beforeEach(() => {
        MigrationModule = new MigrationModule();
    });

    it('should create an instance', () => {
        expect(MigrationModule).toBeTruthy();
    });
});
