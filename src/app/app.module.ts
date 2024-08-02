import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme/theme.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import localeEsExtra from '@angular/common/locales/extra/es';
import { ApiModule, Configuration } from './api-rest';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './core/security/JwtInterceptor';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

export function getApiConfig() {
  let configuracion: Configuration;
  configuracion = new Configuration({
    basePath: environment.API_BASE_PATH,
  });
  return configuracion;
}

registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ThemeModule,
    ApiModule.forRoot(getApiConfig)

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {registerLocaleData(localeEs, 'es', localeEsExtra);}
}
