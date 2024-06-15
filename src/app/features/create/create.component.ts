import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';import { ListComponent } from '../list/list.component';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/products.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)


  onSubmit(product: Product) {
      this.productService.createProduct(product).subscribe(() => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "Ok")
        this.router.navigateByUrl('/')
      })
    }
  }
