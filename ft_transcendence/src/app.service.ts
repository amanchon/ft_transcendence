import { Inject, Injectable } from '@nestjs/common';
import { Repository, FindManyOptions, getRepository, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Joueur, Partie, Message, Salon } from './app.entity';


@Injectable()
export class PartieService {

  constructor(@InjectRepository(Partie) private readonly partieRepository: Repository<Partie>) {}

  async voir_historique(player: number): Promise<Partie[]> {
    return this.partieRepository.createQueryBuilder() // if player == ami || player == moi
      .select('*')
      .from(Partie, 'Partie')
      .where("Partie.joueur1 = player", { player } )
      .orWhere("Partie.joueur2 = player", { player } )
      .getMany();
  }


}


@Injectable()
export class JoueurService {

  constructor(@InjectRepository(Joueur) private readonly joueurRepository: Repository<Joueur>) {}

  async findOrCreate(profile: any): Promise<Joueur> {
    const joueur: Joueur = await this.joueurRepository.findOne({ where: {"id": profile.id }});
    if (joueur) {
      return joueur;
    }
    const nouveau: Joueur = new Joueur();
    nouveau.id = parseInt(profile.id);
    nouveau.pseudo42 = profile.login;
    nouveau.pseudo = profile.login;
    nouveau.email = profile.email;
    nouveau.tel = profile.phone;
    nouveau.avatar = profile.image.versions.micro;
    nouveau.date_creation = new Date();
    nouveau.etat = 1;
    nouveau.victoires = 0;
    nouveau.defaites = 0;
    nouveau.niveau = 0;
    nouveau.xp = 0;
    nouveau.amis = null;
    nouveau.salons = null;
    nouveau.bloques = null;
    return this.joueurRepository.save(nouveau);
  }
  
  async voir(id: number): Promise<Joueur> {
    return this.joueurRepository.findOne({where: {id: id} });
  }

  async modif(id: number, nprofil: Joueur) {
    return this.joueurRepository.update(id, nprofil); // faire verif
  }

  async ajouter_salon(id: number, nsalon: Salon) {
    const joueur: Joueur = await this.joueurRepository.findOne({where: {id: id} });
    if (joueur.salons == null)
      joueur.salons = [];
    joueur.salons.push(nsalon);
    return this.joueurRepository.save(joueur); // moins rapide que update pour les gros changement mais + synchro avec la bdd et donc meilleurs controles
  }
}


@Injectable()
export class MessageService {

  constructor(@InjectRepository(Message) private readonly msgRepository: Repository<Message>) {}

  private create(msg: Message): Promise<Message> {
    return this.msgRepository.save(msg); // Besoin verif
  }

  async voir_salon(id: number): Promise<Message[]> {
    return this.msgRepository.createQueryBuilder()  // if salon.id == moi.salon
      .select('*')
      .from(Message, 'Message')
      .where("Message.salon.id = ", { id } )
      .getMany();
  }
}


@Injectable()
export class SalonService {

  constructor(@InjectRepository(Salon) private readonly salonRepository: Repository<Salon>) {}

  async create(salon: any, createur: Joueur): Promise<Salon> {
    const nouveau: Salon = new Salon();
    nouveau.name = salon.name;
    nouveau.type = salon.type;
    nouveau.date_creation = new Date();
    nouveau.en_attente = [];
    nouveau.membres = [];
    nouveau.membres.push(createur);
    nouveau.admin = [];
    nouveau.proprio = createur;
    return this.salonRepository.create(nouveau); // Besoin verif
  }

  async salons_publiques(): Promise<Salon[]> {
    return this.salonRepository.createQueryBuilder()  // if salon.id == moi.salon
    .select(["id", "proprio", "name", "type", "LENGTH(Salon.membres) as nb_membres"])
    .from(Salon, "Salon")
    .where("Salon.type = 0")
    .orWhere("Salon.type = 1")
    .getRawMany();
  }

  async details(id: number): Promise<Salon> {
    return this.salonRepository.findOne({where: {id: id} });
  }
}