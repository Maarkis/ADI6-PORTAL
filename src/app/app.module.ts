import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductComponent} from './components/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalProductComponent} from './components/product/modal/modal-product/modal-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
        ModalProductComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        HttpClientModule,
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        }
    ],
    entryComponents: [ModalProductComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
