import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {Product} from "../../../../../core/entity/product";
import {ProductService} from "../../../../../service/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  productMatTableDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['idProduct', 'name', 'price', 'stock', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.productMatTableDataSource.paginator = this.paginator;
    this.productMatTableDataSource.sort = this.sort;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.productMatTableDataSource.data = products;
      }
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.productMatTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productMatTableDataSource.paginator) {
      this.productMatTableDataSource.paginator.firstPage();
    }
  }

  deleteUser(idProduct: string): void {
    this.productService.deleteProduct(idProduct).subscribe(data => {
      this.openSnackBar(data.message);
      this.loadProducts();
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
