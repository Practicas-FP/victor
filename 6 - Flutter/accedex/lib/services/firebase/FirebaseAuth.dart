import 'package:batoidex_bat/main.dart';
import 'package:batoidex_bat/services/MyColors.dart';
import 'package:batoidex_bat/services/firebase/FirebaseData.dart';
import 'package:batoidex_bat/ui/forms/login_form.dart';
import 'package:batoidex_bat/ui/pokemon/pokedex_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../MyFunctions.dart';

class MyFirebaseAuthService {
  Future signIn(email, password, context) async {
    myShowDialog(context);

    try {
      await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password);

      navigateToPokedex(context);
    } on FirebaseAuthException catch (e) {
      MyFunctions().toast(e.message, MyColors().redDegradedDark);
    }

    navigatorKey.currentState!.popUntil((route) => route.isFirst);
  }

  Future signUp(email, password, context) async {
    myShowDialog(context);

    try {
      await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: email, password: password);

      saveDataCreated();

      navigateToPokedex(context);
    } on FirebaseAuthException catch (e) {
      MyFunctions().toast(e.message, MyColors().redDegradedDark);
    }

    navigatorKey.currentState!.popUntil((route) => route.isFirst);
  }

  Future resetPassword(email, context) async {
    myShowDialog(context);

    try {
      await FirebaseAuth.instance.sendPasswordResetEmail(email: email);

      MyFunctions().toast('Password reset email sent', MyColors().greenLight);
      navigateToPokedex(context);
    } on FirebaseAuthException catch (e) {
      MyFunctions().toast(e.message, MyColors().redDegradedDark);
    }

    navigatorKey.currentState!.popUntil((route) => route.isFirst);
  }

  signOut() {
    FirebaseAuth.instance.signOut();
  }

  myShowDialog(context) {
    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) => const Center(child: CircularProgressIndicator()));
  }

  navigateToPokedex(context) {
    Navigator.push(
        context, MaterialPageRoute(builder: (_) => const PokedexScreen()));
  }

  navigateToLogin(context) {
    Navigator.push(
        context, MaterialPageRoute(builder: (_) => const LoginForm()));
  }

  saveDataCreated() {
    DateTime now = DateTime.now();
    MyFirebaseData().saveUserCreationData('${now.day}/${now.month}/${now.year}');
  }
}
