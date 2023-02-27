import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, OneToOne, ManyToMany, JoinTable, JoinColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Joueur {
 @PrimaryColumn({
     type: 'bigint',
     name: 'id'
 })
 id: number;
 
 @Column({
    type: 'varchar',
    length: 16,
    name: 'pseudo'
})
 pseudo: string;

 @Column({ 
    type: 'varchar',
    length: 16,
    name: 'pseudo42'
})
 pseudo42: string;

/* @BeforeInsert()
 hashPassword() {
     const hashedPassword = hashMyPass(this.mdp);
     this.mdp = hashedPassword;
 } */

 @Column({
    type: 'varchar',
    length: 30,
    name: 'email'
})
 email: string;

 @Column({
    type: 'varchar',
    length: 13,
    name: 'tel'
})
 tel: string;

 @Column({ 
    type: 'varchar',
    default: '.jpg',
    name: 'avatar'    
})
 avatar: string;
 
 @CreateDateColumn({
     type: 'timestamp',
     name: 'date_creation'
 })
 date_creation: Date;

 @Column({ 
    type: 'int',
    name: 'etat'    
 })
 etat: number;

 @Column({ 
    type: 'int',
    name: 'victoires'    
 })
 victoires: number;

 @Column({ 
    type: 'int',
    name: 'defaites'    
 })
 defaites: number;

 @Column({ 
    type: 'int',
    name: 'niveau'    
 })
 niveau: number;

 @Column({ 
    type: 'int',
    name: 'xp'    
 })
 xp: number;

  @ManyToMany(type => Joueur, {nullable: true})
    @JoinTable({ //  Le JoinTable dans le contexte d'une relation Many-to-Many va créer une nouvelle table qui contiendra des paires de clés étrangères
    name: 'amis'
 })
 amis: Joueur[];

 @ManyToMany(type => Salon, {nullable: true})
    @JoinTable({
    name: 'mes_salons'
 })
 salons: Salon[];

 @ManyToMany(type => Joueur, {nullable: true})
    @JoinTable({
    name: 'bloques'
 })
 bloques: Joueur[];
}




@Entity()
export class Partie {
 @PrimaryGeneratedColumn({
     type: 'int',
     name: 'id'
 })
 id: number;

  @OneToOne(type => Joueur)
    @JoinColumn({
    name: 'joueur1'
})
 joueur1: Joueur;

 @OneToOne(type => Joueur)
    @JoinColumn({
    name: 'joueur2'
})
 joueur2: Joueur;

 @Column({ 
    type: 'int',
    name: 'joueur1_score'    
})
 joueur1_score: number;

 @Column({ 
    type: 'int',
    name: 'joueur2_score'    
})
 joueur2_score: number;
 
 @Column({ 
    type: 'boolean',
    name: 'status'    
})
 status: boolean;

 @CreateDateColumn({
     type: 'timestamp',
     name: 'date_debut'
 })
 date_debut: Date;

 @CreateDateColumn({
     type: 'timestamp',
     name: 'date_fin'
 })
 date_fin: Date;
}




@Entity()
export class Salon {
 @PrimaryGeneratedColumn('increment', {
     type: 'int',
     name: 'id',
 })
 id: number;

 @Column({
     type: 'varchar',
     length: 30,
     name: 'name'
 })
 name: string;

 @Column({
    type: 'int',
    name: 'type'
})
 type: number;

 @CreateDateColumn({
     type: 'timestamp',
     name: 'date_creation'
 })
 date_creation: Date;

 @ManyToMany(type => Joueur, {nullable: true})
    @JoinTable({
    name: 'en_attente'
 })
 en_attente: Joueur[];

 @ManyToMany(type => Joueur)
    @JoinTable({
    name: 'membres'
 })
 membres: Joueur[];

 @ManyToMany(type => Joueur, {nullable: true})
    @JoinTable({
    name: 'admin'
 })
 admin: Joueur[];
 
 @OneToOne(type => Joueur, {nullable: true})
    @JoinColumn({
    name: 'proprio'
 })
 proprio: Joueur;
}



@Entity()
export class Message {
 @PrimaryGeneratedColumn({
     type: 'bigint',
     name: 'id'
 })
 id: number;

  @OneToOne(type => Joueur)
    @JoinColumn({
    name: 'expediteur'
    // referencedColumnName: 'id' --> valeur par défaut;
})
 expediteur: Joueur;

 @OneToOne(type => Salon)
    @JoinColumn({
    name: 'salon'
 })
 salon: Salon;

 @Column({ 
    type: 'text',
    name: 'msg'    
 })
 msg: string;
 
 @CreateDateColumn({
     type: 'timestamp',
     name: 'date'
 })
 date: Date;
}