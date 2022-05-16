import 'package:flutter/material.dart';

class MyColors {
  final redDegradedLight = const Color(0xfff8a55f);
  final redDegradedDark = const Color(0xfff1665f);

  final blueDegradedLight = const Color(0xff0ce8f9);
  final blueDegradedDark = const Color(0xff45b7fe);

  final greenLight = const Color(0xff6bff8c);

  ColorSwatch<int> getColor(type) {
    switch (type) {
      case 'Grass':
        return Colors.greenAccent;
      case 'Fore':
        return Colors.redAccent;
      case 'Water':
        return Colors.blue;
      case 'Electric':
        return Colors.yellow;
      case 'Rock':
        return Colors.grey;
      case 'Ground':
        return Colors.brown;
      case 'Psychic':
        return Colors.indigo;
      case 'Fighting':
        return Colors.orange;
      case 'Bug':
        return Colors.lightGreenAccent;
      case 'Ghost':
        return Colors.deepPurple;
      case 'Normal':
        return Colors.grey;
      case 'Poison':
        return Colors.deepPurpleAccent;
      default:
        return Colors.pink;
    }
  }
}