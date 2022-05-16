import 'package:batoidex_bat/model/pokemon_card.dart';
import 'package:batoidex_bat/services/MyColors.dart';
import 'package:batoidex_bat/ui/pokemon/pokemon_detail_screen.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class PokemonCardWidget extends StatelessWidget {
  final PokemonCard pokemon;

  const PokemonCardWidget({
    Key? key,
    required this.pokemon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => InkWell(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12),
          child: Container(
            decoration: BoxDecoration(
              color: MyColors().getColor(pokemon.type),
              borderRadius: const BorderRadius.all(Radius.circular(20)),
            ),
            child: Stack(children: [
              Positioned(
                  bottom: -10,
                  right: -10,
                  child: Image.asset(
                    'images/pokeball.png',
                    height: 100,
                    fit: BoxFit.fitHeight,
                  )),
              Positioned(
                top: 20,
                left: 10,
                child: Text(
                  pokemon.name,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.white,
                  ),
                ),
              ),
              Positioned(
                top: 45,
                left: 20,
                child: Container(
                  child: Padding(
                    padding: const EdgeInsets.only(
                        left: 8.0, right: 8.0, top: 4, bottom: 4),
                    child: Text(
                      pokemon.type,
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(20)),
                    color: Colors.black26,
                  ),
                ),
              ),
              Positioned(
                  bottom: 5,
                  right: 5,
                  child: Hero(
                    tag: pokemon.id,
                    child: CachedNetworkImage(
                      imageUrl: pokemon.img,
                      height: 100,
                      fit: BoxFit.fitHeight,
                    ),
                  )),
            ]),
          ),
        ),
        onTap: () {
          // TODO Open detal screen
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => PokemonDetailScreen(
                        pokemonCard: pokemon,
                        color: MyColors().getColor(pokemon.type),
                        heroTag: pokemon.id,
                      )));
        },
      );
}
