import { AdminhomeModule } from './adminhome.module';

describe('SignupModule', () => {
  let adminhomeModule: AdminhomeModule;

  beforeEach(() => {
    adminhomeModule = new AdminhomeModule();
  });

  it('should create an instance', () => {
    expect(adminhomeModule).toBeTruthy();
  });
});
