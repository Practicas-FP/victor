import 'package:batoidex_bat/services/MyColors.dart';
import 'package:batoidex_bat/services/MyFunctions.dart';
import 'package:batoidex_bat/services/firebase/FirebaseAuth.dart';
import 'package:batoidex_bat/services/firebase/FirebaseData.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:firebase_auth/firebase_auth.dart';

class GoogleSignInProvider extends ChangeNotifier {
  final googleSignIn = GoogleSignIn();

  GoogleSignInAccount? _user;

  GoogleSignInAccount get user => _user!;

  Future logIn() async {
    try {
      final googleUser = await googleSignIn.signIn();

      if (googleUser == null) return;

      _user = googleUser;

      final googleAuth = await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

      await FirebaseAuth.instance.signInWithCredential(credential);

      if (await MyFirebaseData().isNewAccount()) {
        MyFirebaseAuthService().saveDataCreated();
      }
    } catch (e) {
      MyFunctions().toast(e.toString(), MyColors().redDegradedDark);
    }

    notifyListeners();
  }
}
