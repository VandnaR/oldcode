import { RedirectPageModule } from './redirect-page.module';

describe('RedirectModule', () => {
    let redirectPageModule: RedirectPageModule;

    beforeEach(() => {
        redirectPageModule = new RedirectPageModule();
    });

    it('should create an instance', () => {
        expect(RedirectPageModule).toBeTruthy();
    });
});
