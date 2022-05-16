import 'package:batoidex_bat/services/firebase/FirebaseAuth.dart';
import 'package:flutter/material.dart';

AppBar buildAppBar(BuildContext context) {
  return AppBar(
    backgroundColor: Colors.transparent,
    elevation: 0,
    actions: [
      TextButton(
        onPressed: () => MyFirebaseAuthService().signOut(),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Text('Sign Out',
                style: TextStyle(
                    fontWeight: FontWeight.bold, color: Color(0xfff1665f))),
            SizedBox(
              width: 5,
            ),
            Icon(
              Icons.exit_to_app,
              size: 24.0,
              color: Color(0xfff1665f),
            ),
          ],
        ),
      ),
    ],
  );
}
