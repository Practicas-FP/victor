import 'package:batoidex_bat/services/MyFunctions.dart';
import 'package:batoidex_bat/services/firebase/FirebaseData.dart';
import 'package:batoidex_bat/ui/pokemon/widget/pokemon_card_widget.dart';
import 'package:flutter/material.dart';

import '../../model/pokemon_card.dart';

class PokemonesFavoritesScreen extends StatefulWidget {
  const PokemonesFavoritesScreen({Key? key}) : super(key: key);

  @override
  State<PokemonesFavoritesScreen> createState() =>
      _PokemonesFavoritesScreenState();
}

class _PokemonesFavoritesScreenState extends State<PokemonesFavoritesScreen> {
  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return Stack(
      children: [
        Positioned(
          top: -50,
          right: -50,
          child: Image.asset(
            'images/pokeball.png',
            width: 200,
            fit: BoxFit.fitWidth,
          ),
        ),
        const Positioned(
            top: 80,
            left: 20,
            child: Text(
              'Favorites',
              style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Colors.black),
            )),
        Positioned(
          top: 150,
          bottom: 0,
          width: width,
          child: StreamBuilder<List<PokemonCard>>(
            stream: MyFirebaseData().getPokeFavorites(),
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return MyFunctions().buildTextCenterError(
                    'Something went wrong! ${snapshot.hasError.toString()}');
              } else if (snapshot.hasData) {
                final pokemones = snapshot.data!;

                if (pokemones.isEmpty) {
                  return MyFunctions().buildTextCenterError(
                      'You don\t have any favorite pokemon yet');
                } else {
                  return Column(
                    children: [
                      Expanded(
                          child: GridView.builder(
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2, childAspectRatio: 1.4),
                        itemCount: pokemones.length,
                        itemBuilder: (context, index) =>
                            PokemonCardWidget(pokemon: pokemones[index]),
                      )),
                    ],
                  );
                }
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            },
          ),
        ),
      ],
    );
  }
}
