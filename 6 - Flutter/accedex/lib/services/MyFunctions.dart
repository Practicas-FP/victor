import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class MyFunctions {
  toast(msg, color) {
    Fluttertoast.showToast(
        msg: msg,
        backgroundColor: color,
        textColor: Colors.white,
        toastLength: Toast.LENGTH_LONG);
  }

  Widget buildTextCenterError(msg) => Center(
        child: Container(
          margin: const EdgeInsets.only(left: 20.0, right: 20.0),
          child: Text(
            msg,
            style: const TextStyle(
                fontWeight: FontWeight.bold, fontSize: 24, color: Colors.grey),
            textAlign: TextAlign.center,
          ),
        ),
      );
}
