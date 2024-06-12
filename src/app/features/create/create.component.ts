import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)


  formProduct = new FormGroup({
    title: new FormControl<string>('',
      {
        nonNullable: true,
        validators: Validators.required
      }
    )
  });

  onSubmit() {
    if (this.formProduct.valid) {
      this.productService.createProduct({
        title: this.formProduct.controls.title.value
      }).subscribe(() => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "Ok", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })

        this.router.navigateByUrl('/')
      })
    }
  }
}
