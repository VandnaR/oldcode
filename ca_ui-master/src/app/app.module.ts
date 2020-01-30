import { PortfolioDetails } from './shared/services/PortfolioDetails';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { JWTInterceptor } from './jwtinterceptor';
import { AppConfigService } from './app-config.service';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

const appInitializerFn = (appConfig: AppConfigService) => {
    return () => {
      return appConfig.loadAppConfig();
    };
  };

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,
        PortfolioDetails,{
        provide: HTTP_INTERCEPTORS,
        useClass: JWTInterceptor,
        multi: true
    },AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
