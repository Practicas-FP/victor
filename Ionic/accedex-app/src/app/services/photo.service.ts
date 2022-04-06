/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];

  constructor(private camera: Camera, private senitizer: DomSanitizer) { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await CapacitorCamera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    });
  }



  photo: SafeResourceUrl;

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.senitizer.bypassSecurityTrustScript(image && (image.DataUrl));
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
