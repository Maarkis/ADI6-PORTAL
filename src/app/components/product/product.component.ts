import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {BaseResponse} from '../../models/response/base-response';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductComponent} from './modal/modal-product/modal-product.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    public products: Product[];

    constructor(private productService: ProductService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllProduct();
    }

    // Get all product
    private getAllProduct(): void {
        this.productService.getAll().subscribe((response: BaseResponse<Product[]>) => {
            if (response.success) {
                console.log(response.message);
                this.products = response.result;
            }
        }, error => {
            console.log(error);
        });

    }

    // Create product
    public createProductModal(): void {
        const dialogRef = this.dialog.open(ModalProductComponent, {
            width: 'auto', height: 'auto', data: {}
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.getAllProduct();
            }
        });
    }

    // Edit product
    public editProductModal(product: Product): void {
        const dialogRef = this.dialog.open(ModalProductComponent, {
            width: 'auto', height: 'auto', data: {
                product
            }
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.getAllProduct();
            }
        });
    }

    // Delete product
    public deleteProduct(id: string): void {
        this.productService.delete(id).subscribe((response: BaseResponse<boolean>) => {
            if (response.success) {
                this.getAllProduct();
            }
        }, error => {
            console.log(error);
        });

    }
}
