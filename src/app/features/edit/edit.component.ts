import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/products.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  product: Product = inject(ActivatedRoute).snapshot.data['product']
  router = inject(Router)

  formProduct = new FormGroup({
    title: new FormControl<string>(this.product.title,
      {
        nonNullable: true,
        validators: Validators.required
      }
    )
  });

  onSubmit() {
    if (this.formProduct.valid) {
      this.productService.editProduct(this.product.id, {
        title: this.formProduct.controls.title.value
      }).subscribe(() => {
        this.matSnackBar.open("Produto editado com sucesso!", "Ok")
        this.router.navigateByUrl('/')
      })
    }
  }
}
