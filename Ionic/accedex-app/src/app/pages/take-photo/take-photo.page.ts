import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
