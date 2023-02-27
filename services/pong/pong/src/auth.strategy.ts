import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JoueurService } from './app.service';
import { Joueur } from './app.entity';
const fetch = require('node-fetch');
import OAuth2Strategy = require("passport-oauth2");

//import * as fs from 'fs';


@Injectable()
export class MyOAuth2Strategy extends PassportStrategy(OAuth2Strategy) {

    public name: string;
    private _options: any;

    constructor(private readonly joueurService: JoueurService, private readonly opts: any = null, private readonly verif: Function = null) {
        if (opts == null) {
            opts = {
                clientID: 'u-s4t2ud-0702711b98e203a1ac27a7e4f6cf06a110f9cdfdb08bdbcc120e09fe9f8caa0a',
                clientSecret: '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',
                authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
                tokenURL: 'https://api.intra.42.fr/oauth/token',
                callbackURL: 'http://localhost:3000/Connection',
                scope: ['public'],
            };
        }
        if (verif == null) {
            verif = 
                async function(accessToken: string, refreshToken: string, profile: any, done: Function) {
                    try {
                        if (!accessToken || !refreshToken || !profile) {
                            return done(new UnauthorizedException(), false);
                        }
                        const response = await fetch('https://api.intra.42.fr/v2/me', {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                                }
                            }
                        ).then(response => response.json());
                        const user: Joueur = await this.joueurService.findOrCreate(response);
                        return done(null, user);
                    } catch (err) {
                        console.log(err);
                        return done(new UnauthorizedException(), false);
                    }
                } 
        }
        //console.log(verif);
        super(opts, verif); // super() sert à initialiser la classe parent (OAuth2Strategy) (actuellement this est une classe dérivé d'une classe parent)
        this._options = opts;
        this.name = "oauth2";
        return ;
    }

    async authenticate(req: any, options?: object) {
        try {
            const result = super.authenticate(req, this._options);
            return result;
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}