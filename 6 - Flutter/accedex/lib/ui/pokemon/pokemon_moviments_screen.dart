import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class PokemonMoviments extends StatefulWidget {
  final index;
  final img;
  final int heroTag;

  const PokemonMoviments(
      {Key? key, this.index, this.img, required this.heroTag})
      : super(key: key);

  @override
  _PokemonMovimentsState createState() => _PokemonMovimentsState();
}

class _PokemonMovimentsState extends State<PokemonMoviments> {
  var pokeApi = "pokeapi.co";
  late List moviments = [];

  @override
  void initState() {
    super.initState();
    if (mounted) {
      fetchPokemonDataMoviments();
    }
  }

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;
    return Scaffold(
        body: Stack(
      children: [
        Positioned(
          top: 40,
          left: 1,
          child: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: const Icon(Icons.arrow_back),
            color: Colors.black,
            iconSize: 30,
          ),
        ),
        Positioned(
          top: 0,
          right: 0,
          child: Hero(
            tag: widget.heroTag,
            child: CachedNetworkImage(
              imageUrl: widget.img,
              height: 200,
              fit: BoxFit.fitHeight,
            ),
          ),
        ),
        const Positioned(
            top: 90,
            left: 20,
            child: Text(
              'Movements',
              style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87),
            )),
        Positioned(
          top: 150,
          bottom: 0,
          width: width,
          child: Column(
            children: [
              moviments.isNotEmpty
                  ? Expanded(
                      child: GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 3, childAspectRatio: 1.7),
                      itemCount: moviments.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(
                              vertical: 8.0, horizontal: 12),
                          child: Container(
                            decoration: const BoxDecoration(
                              color: Colors.black54,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                            ),
                            child: Stack(children: [
                              Positioned(
                                  bottom: -22,
                                  right: -70,
                                  child: Image.asset(
                                    'images/pokeball.png',
                                    height: 100,
                                    fit: BoxFit.fitHeight,
                                  )),
                              Center(
                                child: Text(
                                  moviments[index]['move']['name'],
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ]),
                          ),
                        );
                      },
                    ))
                  : const Padding(
                      padding: EdgeInsets.only(top: 24.0),
                      child: Center(
                        child: CircularProgressIndicator(),
                      ),
                    )
            ],
          ),
        ),
      ],
    ));
  }

  void fetchPokemonDataMoviments() {
    var url = Uri.https(pokeApi, "/api/v2/pokemon/" + widget.index.toString());
    http.get(url).then((value) {
      if (value.statusCode == 200) {
        var decodedJsonData = jsonDecode(value.body);
        moviments = decodedJsonData['moves'];
        setState(() {});
      }
    });
  }
}
