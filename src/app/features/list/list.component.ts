import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar produto?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">Não</button>
      <button mat-raised-button (click)="onYes()" color="accent" cdkFocusInitial >Sim</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef)

  onNo(){
    this.matDialogRef.close(false);
  }

  onYes(){
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router)
  matDialog = inject(MatDialog)

  ngOnInit(): void {
    this.productsService.getAll().subscribe((prod) => {
      this.products = prod
    })
  }

  onEdit(product: Product) {
    this.router.navigate(['edit-product', product.id])
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent, 
      {
        height: 'auto',
        width: '280px',
      }
    ).afterClosed().subscribe((answer: boolean) =>{
      if(answer){
        this.productsService.deleteProduct(product.id).subscribe(() => {});
        this.productsService.getAll().subscribe((prod) => {
          this.products = prod
        })
      }
    })
  }
}
