import 'package:batoidex_bat/model/user_data.dart';
import 'package:batoidex_bat/services/MyConstants.dart';
import 'package:batoidex_bat/services/MyFunctions.dart';
import 'package:batoidex_bat/services/firebase/FirebaseData.dart';
import 'package:batoidex_bat/ui/profile/edit_profile_screen.dart';
import 'package:batoidex_bat/ui/profile/widget/numbers_widget.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'widget/appbar_widget.dart';
import 'widget/profile_widget.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final userAuth = FirebaseAuth.instance.currentUser!;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(context),
      body: FutureBuilder<UserData?>(
        future: MyFirebaseData().readData(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return MyFunctions().buildTextCenterError('Something went wrong!');
          } else if (snapshot.hasData) {
            return buildProfile(snapshot.data!);
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  Widget buildName(name, email) => Column(
        children: [
          Text(
            name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(height: 4),
          Text(
            email,
            style: const TextStyle(color: Colors.grey),
          )
        ],
      );

  Widget buildAbout(about) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 48),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'About',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Text(
              about,
              style: const TextStyle(fontSize: 16, height: 1.4),
            ),
          ],
        ),
      );

  Widget buildProfile(UserData userData) => ListView(
        physics: const BouncingScrollPhysics(),
        children: [
          ProfileWidget(
            imagePath: userData.imageUrl ??
                userAuth.photoURL ??
                MyConstants().NO_IMAGE_PROFILE,
            onClicked: () async {
              await Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => EditProfileScreen(userData: userData)));

              setState(() {});
            },
          ),
          const SizedBox(height: 24),
          buildName(
              userData.name ??
                  userAuth.displayName ??
                  'You don\'t have a name yet',
              userAuth.email),
          const SizedBox(height: 24),
          NumbersWidget(
              pokeFavorites: userData.numPokeFavs ?? 0,
              verifiedEmail: userAuth.emailVerified,
              creationDate: userData.creationDate ?? 'No date'),
          const SizedBox(height: 48),
          buildAbout(userData.about ??
              'Edit your profile if you want to add a description'),
        ],
      );
}
