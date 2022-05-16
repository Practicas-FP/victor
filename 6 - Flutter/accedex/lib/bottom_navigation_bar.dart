import 'package:batoidex_bat/services/MyColors.dart';
import 'package:batoidex_bat/ui/pokemon/pokedex_screen.dart';
import 'package:batoidex_bat/ui/pokemon/pokemones_favorites_screen.dart';
import 'package:batoidex_bat/ui/profile/profile_screen.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';

class MyBottomNavigationBar extends StatefulWidget {
  const MyBottomNavigationBar({Key? key}) : super(key: key);

  @override
  State<MyBottomNavigationBar> createState() => _MyBottomNavigationBarState();
}

class _MyBottomNavigationBarState extends State<MyBottomNavigationBar> {
  final navigationKey = GlobalKey<CurvedNavigationBarState>();
  int index = 0;

  final screens = [
    const PokedexScreen(),
    const PokemonesFavoritesScreen(),
    const ProfileScreen()
  ];

  @override
  Widget build(BuildContext context) {
    final items = <Widget>[
      const Icon(Icons.home, size: 30),
      const Icon(Icons.favorite, size: 30),
      const Icon(Icons.person, size: 30),
    ];

    return Scaffold(
      body: screens[index],
      bottomNavigationBar: Theme(
        data: Theme.of(context)
            .copyWith(iconTheme: const IconThemeData(color: Colors.white)),
        child: CurvedNavigationBar(
            key: navigationKey,
            color: MyColors().blueDegradedDark,
            backgroundColor: Colors.transparent,
            height: 50,
            animationCurve: Curves.easeInOut,
            animationDuration: const Duration(milliseconds: 300),
            index: index,
            items: items,
            onTap: (index) => setState(() => this.index = index)),
      ),
    );
  }
}
