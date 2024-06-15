import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/products.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  product = input<Product | null>(null);
  formProduct!: FormGroup;

  @Output() done = new EventEmitter<Product>()

  ngOnInit(): void {
    this.formProduct = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', //pode ter valor(edit) ou não (create)
        {
          nonNullable: true,
          validators: Validators.required
        }
      )
    });
  }

  onSubmit(){
    const product = this.formProduct.value as Product;
    this.done.emit(product);
  }
}
