import 'package:flutter/material.dart';

class NumbersWidget extends StatelessWidget {
  final int pokeFavorites;
  final bool verifiedEmail;
  final String creationDate;

  const NumbersWidget(
      {Key? key, required this.pokeFavorites, required this.verifiedEmail, required this.creationDate})
      : super(key: key);

  @override
  Widget build(BuildContext context) => IntrinsicHeight(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            buildButton(context, '$pokeFavorites', 'Favorites'),
            buildDivider(),
            buildButton(context, verifiedEmail ? ' Yes' : 'No', 'Verified email'),
            buildDivider(),
            buildButton(context, creationDate, 'Creation date'),
          ],
        ),
      );

  Widget buildDivider() => const SizedBox(
        height: 24,
        child: VerticalDivider(),
      );

  Widget buildButton(BuildContext context, String value, String text) =>
      MaterialButton(
        padding: const EdgeInsets.symmetric(vertical: 4),
        onPressed: () {},
        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Text(
              value,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            const SizedBox(height: 2),
            Text(
              text,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      );
}
