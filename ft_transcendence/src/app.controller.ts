import { Body, Controller, Get, Post, Put, Query, Res, Req, Next, UnauthorizedException, UseGuards, ConsoleLogger } from '@nestjs/common';
import { PartieService, JoueurService, SalonService } from './app.service';
import { Joueur, Partie, Salon } from './app.entity';
import { AuthGuard } from '@nestjs/passport';
import passport = require("passport");
//import OAuth2Strategy = require("passport-oauth2");
//var OAuth2Strategy = require('passport-oauth2').OAuth2Strategy;
//import OAuth2Strategy from 'passport-oauth2';
//import { OAuth2Strategy } from 'passport-oauth2';
//import * as passportOAuth2 from 'passport-oauth2';
//const OAuth2Strategy = passportOAuth2.OAuth2Strategy;

import { MyOAuth2Strategy } from './auth.strategy';

@Controller()
export class AppController {
  constructor(private readonly partieService: PartieService, private readonly joueurService: JoueurService,
    private readonly salonService: SalonService) {}


  private _401(res) {
    return res.status(401).json({
      message: 'Unauthorized',
     });
  }



  @Get('/oauth2')
  async oauth2(@Req() req, @Res() res, @Next() next) {
    res.setHeader("Content-Type", "text/html");
    return res.sendFile("/home/user42/Documents/Projets/ft_transcendence/services/pong/pong/public/connection.html");
  }

  @Get('/Connection')
  //@UseGuards(AuthGuard('oauth2')) // Use the 'UseGuards' to apply the passport middleware, instead of calling passport.authenticate('oauth2', fct) directly.
  async Callback(@Req() req, @Res() res, @Next() next) {
    passport.authenticate('oauth2');
    passport.authenticate('oauth2', (err, user, info) => { // Lance la methode verify de la stratégie, puis passe les valeurs de retour en param a la fonction.
      if (err || !user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      req.login(user, (err) => { // Serialize le user puis le mets dans req.session.passport.user et fais un req.session.save()
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized'});
        }
        return res.redirect('/home');
      });
      //return next(); // le contrôle passe au prochain gestionnaire dans la chaîne de traitement des requêtes pour cette route. Cela permet à la requête d'être transmise à d'autres middlewares ou à la fonction de traitement de route associée pour une exécution ultérieure. Inutile si il y a un return "normal"
    })(req, res, next); // signifie que la fonction passée à passport.authenticate est immédiatement appelée avec les arguments req, res, next. Cette expression permet d'exécuter immédiatement la fonction retournée par passport.authenticate. En d'autres termes, cela déclenche la procédure d'authentification.
}

  @Get('/home')
  Acceuil(@Req() req, @Res() res) {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    res.setHeader("Content-Type", "text/html");
    return res.sendFile("/home/user42/Documents/Projets/ft_transcendence/services/pong/pong/public/home.html");
  }

@Get('/Deconnexion')
Deconnexion(@Req() req, @Res() res) {
  if (req.isAuthenticated() == false || !req.user)
    return this._401(res);
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.redirect('/oauth2');
    });
  });
}

  @Get('/app.js')
  AppJS(@Req() req, @Res() res) {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    res.setHeader("Content-Type", "application/javascript");
    return res.sendFile("/home/user42/Documents/Projets/ft_transcendence/services/pong/pong/public/app.js");
  }

  /*@Get('/menu.js')
  MenuJS(@Req() req, @Res() res) {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    res.setHeader("Content-Type", "application/javascript");
    return res.sendFile("/home/user42/Documents/Projets/ft_transcendence/services/pong/pong/public/menu.js");
  }*/

  @Get('/style.css')
  StyleCSS(@Req() req, @Res() res) {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    res.setHeader("Content-Type", "text/css");
    return res.sendFile("/home/user42/Documents/Projets/ft_transcendence/services/pong/pong/public/style.css");
  }

  @Get('/moi')
  Moi(@Req() req, @Res() res) {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    return res.status(200).send(req.user);
  }

  @Get('/Profil')
  async Profil(@Query('id') id: string, @Req() req, @Res() res): Promise<Joueur> {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    return res.send(await this.joueurService.voir(parseInt(id)));
  }

  @Get('/Historiqe')
  async Historique(@Query('player') player: number, @Req() req, @Res() res): Promise<Partie[]> {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    return res.send(await this.partieService.voir_historique(player));
  }

  @Get('/Mes_Salons')
  async Mes_Salons(@Req() req, @Res() res): Promise<Salon> {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    if (req.user.salons == null)
      return res.sendStatus(204);
    return res.send(req.user.salons);
  }

  @Get('/Details_Salon')
  async Details_Salon(@Query('id') id: number, @Req() req, @Res() res): Promise<Salon> {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    return res.send(await this.salonService.details(id));
  }

  @Get('/Salons_Publiques')
  async Salons_Publiques(@Req() req, @Res() res): Promise<Salon[]> {
    return res.status(200).send(await this.salonService.salons_publiques());
  }

  @Post('/Creer_Salon')
  async Creer_Salon(@Body() nsalon: any, @Req() req, @Res() res): Promise<Salon> {
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    const salon: Salon = await this.salonService.create(nsalon, req.user);
    console.log("id: " + salon.id);
    console.log(await this.joueurService.ajouter_salon(req.user.id, salon));
    return res.sendStatus(204);
  }

  @Put('/Modif_Profil')
  async Modif_Profil(@Req() req, @Res() res, @Body() nprofil): Promise<Joueur> { 
    if (req.isAuthenticated() == false || !req.user)
      return this._401(res);
    const result = await this.joueurService.modif(req.user.id, nprofil); 
    if (result.affected != 1)
      return res.sendStatus(500);
    return res.sendStatus(204); // No content
  }
}