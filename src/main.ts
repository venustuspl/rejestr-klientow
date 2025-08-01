import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_ROUTES } from './app/app-routes';
import { AuthModule } from './app/modules/auth/auth.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './app/modules/core/interceptors/spinner.interceptor';
import { HeaderClassInterceptor } from './app/modules/core/interceptors/header.class.interceptor';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AuthModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderClassInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
