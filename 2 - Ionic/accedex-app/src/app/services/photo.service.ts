/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { map } from 'rxjs/operators';
import { UserPhoto } from '../models/interfaces/user-photo.interface';
import { FbService } from './fb.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo;

  constructor(private fbService: FbService) { }

  public async addNewToGallery() {
    // Take a photo
    const image = await CapacitorCamera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Convert the photo to base64 and save it to the DB
    this.readAsBase64(image.webPath)
      .then(result => {
        this.fbService.addUserPhoto(result);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private async readAsBase64(webviewPath) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(webviewPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Get photo
  async getUserPhoto() {
    this.fbService.getUserPhoto().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const userPhoto: UserPhoto = {
            $key: a.key,
            data: String(a.payload.val())
          };

          return userPhoto;
        })
      )
    ).subscribe(userPhoto => {
      if (userPhoto.length) {
        this.fbService.userPhoto = userPhoto[0];
        this.photo = userPhoto[0].data;
      }
    });
  }

  deleteUserPhoto() {
    this.fbService.deleteUserPhoto(this.fbService.userPhoto.$key);
  }
}
