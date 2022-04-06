/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserPhoto } from '../models/interfaces/user-photo.interface';
import { FbService } from './fb.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  public photo: UserPhoto;
  public photoSenitazer: SafeResourceUrl;

  constructor(private senitizer: DomSanitizer, private fbService: FbService) { }

  public async addNewToGallery() {
    // Take a photo
    const image = await CapacitorCamera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = {
      filepath: '',
      webviewPath: image.webPath
    };

    this.photos.unshift(this.photo);

    //this.fbService.addUserPhoto(this.photo);

    this.photoSenitazer = this.senitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

    console.log(this.photoSenitazer);

    //crear la foto como base 64
  }
}
