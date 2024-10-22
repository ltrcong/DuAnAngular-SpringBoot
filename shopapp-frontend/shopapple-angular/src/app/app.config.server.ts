import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { appConfig } from './app.config';
import { Provider } from '@angular/core';
import { TokenInterceptor } from './interceptors/token.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
