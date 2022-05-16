import 'package:batoidex_bat/services/MyFunctions.dart';
import 'package:batoidex_bat/services/firebase/FirebaseAuth.dart';
import 'package:batoidex_bat/ui/background/background.dart';
import 'package:batoidex_bat/ui/forms/login_form.dart';
import 'package:batoidex_bat/ui/forms/verify_email_form.dart';
import 'package:batoidex_bat/ui/pokemon/pokedex_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:batoidex_bat/services/firebase/GoogleSignIn.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const Pokedex());
}

final navigatorKey = GlobalKey<NavigatorState>();

class Pokedex extends StatelessWidget {
  const Pokedex({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
        create: (context) => GoogleSignInProvider(),
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
              primaryColor: Colors.blue.shade300, dividerColor: Colors.black),
          navigatorKey: navigatorKey,
          title: 'Batoidex',
          home: Scaffold(
            body: StreamBuilder(
              stream: FirebaseAuth.instance.authStateChanges(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasData) {
                  return const VerifyEmailForm();
                } else if (snapshot.hasError) {
                  return Stack(children: [
                    Background(),
                    MyFunctions().buildTextCenterError('Something went wrong!')
                  ]);
                } else {
                  return Stack(children: [Background(), const LoginForm()]);
                }
              },
            ),
          ),
        ));
  }
}
