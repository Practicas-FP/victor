import 'package:batoidex_bat/services/firebase/GoogleSignIn.dart';
import 'package:batoidex_bat/ui/forms/register_form.dart';
import 'package:batoidex_bat/ui/forms/reset_password_form.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:batoidex_bat/services/firebase/FirebaseAuth.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final formKey = GlobalKey<FormState>();

  validateForm() {
    return formKey.currentState!.validate();
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          margin: const EdgeInsets.only(bottom: 60),
          child: const Text(
            "Login",
            style: TextStyle(
              fontSize: 35,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(
          height: 150,
          child: Stack(
            children: [
              Container(
                height: 150,
                margin: const EdgeInsets.only(
                  right: 70,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: const BorderRadius.only(
                    topRight: Radius.circular(100),
                    bottomRight: Radius.circular(100),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 0,
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Form(
                  key: formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        margin: const EdgeInsets.only(left: 16, right: 32),
                        child: TextFormField(
                          controller: emailController,
                          decoration: const InputDecoration(
                            hintStyle: TextStyle(fontSize: 20),
                            border: InputBorder.none,
                            icon: Icon(Icons.account_circle_rounded),
                            hintText: "Email",
                          ),
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (email) =>
                              email != null && !EmailValidator.validate(email)
                                  ? 'Enter a valid email'
                                  : null,
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(left: 16, right: 32),
                        child: TextFormField(
                          controller: passwordController,
                          obscureText: true,
                          decoration: const InputDecoration(
                            hintStyle: TextStyle(fontSize: 22),
                            border: InputBorder.none,
                            icon: Icon(Icons.lock_rounded),
                            hintText: "Password",
                          ),
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (password) =>
                              password != null && password.length < 6
                                  ? 'Enter min. 6 characters'
                                  : null,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: InkWell(
                  child: Container(
                    margin: const EdgeInsets.only(right: 15),
                    height: 80,
                    width: 80,
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Colors.green[200]!.withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: const Offset(0, 3),
                        ),
                      ],
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                        colors: [
                          Color(0xff1bccba),
                          Color(0xff22e2ab),
                        ],
                      ),
                    ),
                    child: const Icon(
                      Icons.arrow_forward_outlined,
                      color: Colors.white,
                      size: 32,
                    ),
                  ),
                  onTap: () {
                    if (validateForm()) {
                      MyFirebaseAuthService().signIn(
                          emailController.text.trim(),
                          passwordController.text.trim(),
                          context);
                    }
                  },
                ),
              ),
            ],
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            InkWell(
              child: Container(
                margin: const EdgeInsets.only(right: 16, top: 16),
                child: Text(
                  "Forgot ?",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Colors.grey[400],
                  ),
                ),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => const ResetPasswordForm()));
              },
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            InkWell(
              child: Container(
                margin: const EdgeInsets.only(left: 16, top: 16),
                child: const Text(
                  'Register',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Color(0xffe98f60),
                  ),
                ),
              ),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const RegisterForm()));
              },
            ),
            Container(
              margin: const EdgeInsets.only(left: 16, top: 16),
              child: IconButton(
                  onPressed: () {
                    final provider = Provider.of<GoogleSignInProvider>(context,
                        listen: false);
                    provider.logIn();
                  },
                  icon: const Icon(FontAwesomeIcons.google,
                      color: Color(0xfff1665f))),
            ),
          ],
        )
      ],
    );
  }
}
