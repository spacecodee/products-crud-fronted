import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../../service/product.service";
import {Product} from "../../../../../core/entity/product";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  idProduct: string = "";
  buttonTitle: string = "Agregar";

  constructor(private _snackBar: MatSnackBar, private productService: ProductService, private formBuilder: FormBuilder, private activeRouter: ActivatedRoute, private router: Router) {
    this.addProductForm = formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.idProduct = this.activeRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    if (this.idProduct !== "" && this.idProduct !== null) {
      this.productService.getProductById(this.idProduct).subscribe(data => {
        this.addProductForm.setValue({
          name: data.name,
          price: data.price,
          stock: data.stock
        });
      });
      this.buttonTitle = "Actualizar";
    }
  }

  addUpdateProduct(): void {
    if (this.idProduct === null) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  addProduct(): void {
    const product: Product = {
      idProduct: "",
      name: this.addProductForm.value.name,
      price: this.addProductForm.value.price,
      stock: this.addProductForm.value.stock
    }

    this.productService.addProduct(product).subscribe(data => {
      this.openSnackBar(data.message);
    });

    this.addProductForm.reset();
  }

  updateProduct(): void {
    const product: Product = {
      idProduct: this.idProduct,
      name: this.addProductForm.value.name,
      price: this.addProductForm.value.price,
      stock: this.addProductForm.value.stock
    }

    this.productService.updateProduct(this.idProduct, product).subscribe(data => {
      this.openSnackBar(data.message);
      this.router.navigate(['/product']).then(() => {
      });
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
