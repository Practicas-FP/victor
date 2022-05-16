class PokemonCard {
  final int id;
  final String img;
  final String name;
  final String type;
  final String types;
  final String height;
  final String weight;
  final String spawnTime;
  final String weakness;
  final String? nextEvolution;
  final String? prevEvolution;

  PokemonCard(
      {required this.id,
      required this.img,
      required this.name,
      required this.type,
      required this.types,
      required this.height,
      required this.weight,
      required this.spawnTime,
      required this.weakness,
      required this.nextEvolution,
      required this.prevEvolution});

  Map<String, dynamic> toJson() => {
        'id': id,
        'img': img,
        'name': name,
        'type': type,
        'types': types,
        'height': height,
        'weight': weight,
        'spawn_time': spawnTime,
        'weakness': weakness,
        'next_evolution': nextEvolution,
        'prev_evolution': prevEvolution
      };

  static PokemonCard fromJson(Map<String, dynamic> json) => PokemonCard(
      id: json['id'],
      img: json['img'],
      name: json['name'],
      type: json['type'],
      types: json['types'],
      height: json['height'],
      weight: json['weight'],
      spawnTime: json['spawn_time'],
      weakness: json['weakness'],
      nextEvolution: json['next_evolution'],
      prevEvolution: json['prev_evolution']);
}
