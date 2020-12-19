import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {Product} from '../../../../models/product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product.service';
import {BaseResponse} from '../../../../models/response/base-response';

@Component({
    selector: 'app-modal-product',
    templateUrl: './modal-product.component.html',
    styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

    public productId: string = null;
    public form: FormGroup = null;
    private product: Product = null;

    constructor(
        public dialogRef: MatDialogRef<ModalProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private productService: ProductService) {
        if (data.product) {
            this.productId = data.product.id;
        }
    }

    ngOnInit(): void {
        console.log('modal opened');

        if (this.productId) {
            this.getByIdProduct(this.productId);
        } else {

            this.form = this.createForm(new Product());
        }
    }

    private createForm(product: Product): FormGroup {
        return this.fb.group({
            name: new FormControl(product.name, [
                Validators.required
            ]),
            description: new FormControl(product.description, [
                Validators.maxLength(100)
            ]),
            price: new FormControl(product.price, [
                Validators.required
            ]),
            amount: new FormControl(product.amount, [])
        });
    }

    private editForm(product: Product): FormGroup {
        return this.fb.group({
            id: new FormControl(product.id, []),
            name: new FormControl(product.name, [
                Validators.required
            ]),
            description: new FormControl(product.description, [
                Validators.maxLength(100)
            ]),
            price: new FormControl(product.price, [
                Validators.required
            ]),
            amount: new FormControl(product.amount, []),
            createAt: new FormControl(product.createAt, []),
            updateAt: new FormControl(product.updateAt, [])
        });
    }

    private getByIdProduct(productId: string): void {
        this.productService.getById(productId).subscribe((response: BaseResponse<Product>) => {
            if (response.success) {
                console.log(response.message);

                this.form = this.editForm(this.product = response.result);

            }
        }, error => {
            console.log(error);
        });

    }

    // send product to api
    onSubmit(product: Product): void {
        this.productId ? this.editProduct(product) : this.createProduct(product);
    }

    public close(result: boolean = false): void {
        this.dialogRef.close(result);
    }


    private editProduct(product: Product): void {
        this.productService.put(product).subscribe((response: BaseResponse<Product>) => {
            if (response.success) {
                console.log(response.message);

                this.close(response.success);
            }
        }, error => {
            console.log(error);
        });
    }

    private createProduct(product: Product): void {
        this.productService.post(product).subscribe((response: BaseResponse<Product>) => {
            if (response.success) {
                console.log(response.message);

                this.close(response.success);
            }

        }, error => {
            console.log(error);
        });
    }
}
