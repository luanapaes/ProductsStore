import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProducts } from './shared/resolvers/get-products.resolver';
import { getProduct } from './shared/resolvers/get-product.resolver';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            products: getProducts //função do file(resolvers/get-products)
        },
        component: ListComponent
    },
    {
        path: 'create-product',
        loadComponent: () => 
            import('./features/create/create.component').then(
                (m) => m.CreateComponent
            ),
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: getProduct //função do file(resolvers/get-product)
        },
        loadComponent: () =>
            import('./features/edit/edit.component').then(
                (m) => m.EditComponent
            ),
        
    }
];
