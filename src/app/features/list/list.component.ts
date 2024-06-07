import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  products: Product[] = [];
  
  productsService = inject(ProductsService)

  ngOnInit(): void {
    this.productsService.getAll().subscribe((prod) => {
      this.products = prod
    })
  }
}
