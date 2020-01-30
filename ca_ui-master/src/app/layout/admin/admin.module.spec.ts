import { AdminModule } from './admin.module';

describe('ChartsModule', () => {
    let AdminModule: AdminModule;

    beforeEach(() => {
        AdminModule = new AdminModule();
    });

    it('should create an instance', () => {
        expect(AdminModule).toBeTruthy();
    });
});
