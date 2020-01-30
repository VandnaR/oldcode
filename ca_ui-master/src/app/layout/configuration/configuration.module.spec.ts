import { ConfigurationModule } from './configuration.module';

describe('ChartsModule', () => {
    let configurationModule: ConfigurationModule;

    beforeEach(() => {
        configurationModule = new ConfigurationModule();
    });

    it('should create an instance', () => {
        expect(configurationModule).toBeTruthy();
    });
});
