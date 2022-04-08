import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public authService: AuthService,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.photoService.getUserPhoto();
  }

  async showProfilePictureOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile picture options',
      buttons: [
        { text: 'Change image', icon: 'camera-outline', handler: () => { this.photoService.addNewToGallery(); } },
        { text: 'Delete image', icon: 'trash-outline', handler: () => { this.photoService.deleteUserPhoto(); } }
      ],
    });

    await actionSheet.present();
  }
}
