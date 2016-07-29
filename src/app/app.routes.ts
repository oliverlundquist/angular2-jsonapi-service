import { provideRouter, RouterConfig } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const routes: RouterConfig = [
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: 'products', component: ProductsComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
