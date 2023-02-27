import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JoueurService } from './app.service';
import { Joueur } from './app.entity';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as session  from 'express-session'
import passport = require("passport");
import { MyOAuth2Strategy } from './auth.strategy';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));
  const joueurservice = app.get(JoueurService);
  app.use(session({
    secret: 'LeSecret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      path: '/',
      maxAge: 100 * 60 * 60 * 2, // Tps de vie du cookie en ms
      secure: false, // Uniquement sur https ou pas
      httpOnly: true // indique si le cookie ne peut être accédé que par le serveur (protection contre les attaques XSS).
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  const strategy = new MyOAuth2Strategy(joueurservice);
  passport.use(strategy);
  passport.serializeUser((user: Joueur, done: Function) => { // Permet de stocker user.id dans la session
    try {
      return done(null, user.id);
    } catch(err) {
      console.error(err);
      return done(err, false)
    }
  });
  passport.deserializeUser(async (id: number, done: Function) => { // Permet de recuperer le user automatiquement à chaque requeter et d'y accéder grace à req.user
    const user = await joueurservice.voir(id);
    if (!user) {
      return done(new Error("user not found"), false);
    }
    return done(null, user);
  });
  await app.listen(3000);
}

bootstrap();
