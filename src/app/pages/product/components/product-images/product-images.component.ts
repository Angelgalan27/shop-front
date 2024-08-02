import { Component, Input, OnInit, Output } from '@angular/core';
import { FileModel, ProductModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit{

  @Input() product!: ProductModel;
  images: {file: FileModel, image: string}[] = [];
  constructor(private _product: ProductService,
    private _global: GlobalService) {

   }
  ngOnInit(): void {
    this.getFiles();
  }

   private getFiles() {
    this.product.files?.forEach((file: FileModel) => {
      this._product.getFiles(file)
      .subscribe((fileBlob: Blob) => {
        this.images.push({file,image: URL.createObjectURL(fileBlob)});
      });
    });
   }

   delete(file: FileModel) {
    this._global.confirmDialog('¿Está seguro de eliminar la imagen?')
    .then((result: any) => {
      if (result) {
        this._product.deleteFile(this.product.id as string, file)
        .subscribe((respuesta: any) => {
          const imageDel = this.images.find((image: {file: FileModel, image: string}) => image.file.name === file.name) as {file: FileModel, image: string};
          console.log(this.images.indexOf(imageDel));
          this.images.splice(this.images.indexOf(imageDel), 1);

          this.product.files?.splice(this.product.files.indexOf(file), 1);
        });
      }
    });
   }
}
