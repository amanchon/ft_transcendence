const { useState } = React;

const React_sous_menu = ReactDOM.createRoot(document.getElementById("react_sous-menu"));
const React_fenetre_gauche = ReactDOM.createRoot(document.getElementById("fenetre_gauche"));
const React_fenetre_droite = ReactDOM.createRoot(document.getElementById("fenetre_droite"));
const React_fenetre_centrale = ReactDOM.createRoot(document.getElementById("fenetre_centrale"));
const React_fenetre_grande = ReactDOM.createRoot(document.getElementById("fenetre_grande"));

let moi_id;



function Deconnexion() {
    fetch('http://localhost:3000/Deconnexion', {method: 'GET' })
        .then(response => {
            if (response.redirected) {
              window.location.href = response.url;
            }
        })
        .catch(error => {
            console.error(error); // PAGE 500
        }
    );
};

function Render_rejoindresalon(props) {

};

function Render_profil(props) {
    const profil = props.profil;
    let etat;
    let bouton_display = "none";
    if (profil.etat == 0) {
        etat = "Déconnecté";
    }
    else if (profil.etat == 1) {
        etat = "Connecté";
    }
    else if (profil.etat == 2) {
        etat = "En recherche d'adversaire...";
    }
    else if (profil.etat == 3) {
        etat = "En partie";
    }
    if (profil.id === moi_id) {
        bouton_display = "block";
    }
    return (
        <div>
            <h1>Profil de {profil.pseudo}</h1>
            <p style={{opacity: '1'}}>
                <b>Pseudo:</b> {profil.pseudo}<br /><br />
                <b>Pseudo42:</b> {profil.pseudo42}<br /><br />
                <b>Courriel:</b> {profil.email}<br /><br />
                <b>Téléphone:</b> {profil.tel}<br /><br />
                <b>Date de création:</b> {profil.date_creation}<br /><br />
                <b>Etat:</b> {etat}<br /><br />
                <b>Victoires:</b> {profil.victoires}<br /><br />
                <b>Défaites:</b> {profil.defaites}<br /><br />
                <b>Niveau:</b> {profil.niveau}<br /><br />
                <b>Expérience:</b> {profil.xp}<br /><br />
                <b>Amis:</b> {profil.amis}<br /><br />
                <b>Bloqués:</b> {profil.bloques}<br /><br />
                <b>Canaux:</b> {profil.canaux}<br /><br />
            </p>
            <div id="bouton_modifier_profil" className="Boutons_div"
            onMouseOver={() => document.getElementById("bouton_modifier_profil").style.backgroundColor = 'rgb(15, 15, 90)'}
            onMouseOut={() => document.getElementById("bouton_modifier_profil").style.backgroundColor = 'rgb(15, 15, 140)'}
            onClick={() => React_fenetre_gauche.render(<ModifProfil moi={profil}/>)}
            style={{display: bouton_display}}>
                <b>Modifier</b>
            </div> 
        </div>
        );
};

function affichage_centrale(render) {
    document.getElementById("fenetre_gauche").style.display = "none";
    document.getElementById("fenetre_droite").style.display = "none";
    document.getElementById("fenetre_grande").style.display = "none";
    React_fenetre_gauche.render();
    React_fenetre_droite.render();
    React_fenetre_grande.render();
    React_fenetre_centrale.render(render);
    document.getElementById("fenetre_centrale").style.display = "flex";
};

function affichage_gauchedroite(render_gauche, render_droite) {
    document.getElementById("fenetre_centrale").style.display = "none";
    document.getElementById("fenetre_grande").style.display = "none";
    React_fenetre_centrale.render();
    React_fenetre_grande.render();
    React_fenetre_gauche.render(render_gauche);
    React_fenetre_droite.render(render_droite);
    document.getElementById("fenetre_gauche").style.display = "flex";
    document.getElementById("fenetre_droite").style.display = "flex";
};

async function voir_profil(id) {
    const response = await fetch('http://localhost:3000/Profil?id=' + id, {method: 'GET'});
    const profil = await response.json();
    affichage_gauchedroite(<Render_profil profil={profil}/>, <h1>Historique de {profil.pseudo}</h1>);
    return ;
};

function mon_profil() {
    voir_profil(moi_id.toString()); // pour mettre à jour 'moi'
    return ;
};

function creer_salon() {
    affichage_centrale(<CreerSalon/>);
    return ;
};

async function rejoindre_salon() {
    const response = await fetch('http://localhost:3000/Salons_Publiques', {method: 'GET'});
    let tmp_salons;
    if (response.status === 204)
        tmp_salons = [];
    else
        tmp_salons = await response.json();
    const salons = tmp_salons;
    affichage_centrale(<TabSalons titre="Rejoindre un salon" data={salons}/>);
    return ;
};

async function mes_salons() {
    const response = await fetch('http://localhost:3000/Mes_Salons', {method: 'GET'});
    let tmp_salons;
    if (response.status === 204)
        tmp_salons = [];
    else
        tmp_salons = await response.json();
    const salons = tmp_salons;
    affichage_centrale(<TabSalons titre="Mes salons" data={salons}/>);
    return ;
};

const TabSalons = (props) => {
    const [data, setData] = useState(props.data);

    return (
        <div>
            <h1>{props.titre}</h1>
            <table border='1'>
                <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Propriétaire</th>
                      <th>Type</th>
                      <th>Nombres de membres</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.proprio}</td>
                            <td>{item.type}</td>
                            <td>{item.membres.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ModifProfil = (props) => { // "composant de fonction React" permet d'utiliser useState()
    const [pseudo, setName] = useState(props.moi.pseudo);
    const [email, setEmail] = useState(props.moi.email);
    const [tel, setTel] = useState(props.moi.tel);
    const [avatar, setAvatar] = useState(props.moi.avatar);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empeche l'evenement par défaut
        let succes;
        fetch('http://localhost:3000/Modif_Profil', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            pseudo: pseudo,
            email: email,
            tel: tel,
            avatar: avatar
            })
        })
        .then ((response) => {
            if (response.status == 204) {
                voir_profil(moi_id.toString());
                succes = true;
            }
            //else 
            //    succes = false;
        });
        /*if (succes == false)
            return <h1>Le profil n'a pas pu être modifié</h1>;*/ // La gestion d'erreur ne fonctionne pas !
        return ;
    };
    return (
        <form onSubmit={handleSubmit}>
          <label>
            Pseudo :
            <input type="text" maxLength="16" value={pseudo} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Adresse courriel :
            <input type="email" maxLength="30" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Téléphone :
            <input type="tel" maxLength="20" value={tel} onChange={(e) => setTel(e.target.value)} />
          </label>
          <br />
          <label>
            Avatar :
            <input type="avatar" maxLength="100" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </label>
          <br /><br />
          <button type="submit">Envoyer</button>
        </form>
    );
};

const CreerSalon = () => { // "composant de fonction React" permet d'utiliser useState()
    const [name, setName] = useState('');
    const [type, setType] = useState('0');
    const handleSubmit = (e) => {
        e.preventDefault(); // Empeche l'evenement par défaut
        let succes;
        fetch('http://localhost:3000/Creer_Salon', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            name: name,
            type: type,
            })
        })
        .then ((response) => {
            if (response.status == 204) {
               // voir_profil(moi_id.toString());
                succes = true;
            }
            //else 
            //    succes = false;
        });
        /*if (succes == false)
            return <h1>Le profil n'a pas pu être modifié</h1>;*/ // La gestion d'erreur ne fonctionne pas !
        return ;
    };
    return (
        <form onSubmit={handleSubmit}>
          <label>
            Nom du salon :
            <input type="text" maxLength="30" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Type de salon :
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="0">Publique</option>
                <option value="1">Publique avec mot de passe</option>
                <option value="2">Privé</option>
            </select>
          </label>
          <br /><br />
          <button type="submit">Envoyer</button>
        </form>
    );
};

const req_moi = (async function() {
    const response_user = await fetch('http://localhost:3000/moi', {method: 'GET'});
    const moi = await response_user.json();
    moi_id = moi.id;
    return ;
})(); // (function() {})(); signifie que la fonction sera executé directement à la définition



/* **************** SOUS-MENU **************** */

function quitter_sous_menu() {
    const react_sous_menu = document.getElementById("react_sous-menu");
    if (parent == null || react_sous_menu == null)
        return;
    React_sous_menu.render();
    react_sous_menu.style.display = "none"; 
    react_sous_menu.parentNode.removeChild(react_sous_menu);
    document.body.appendChild(react_sous_menu);
};

function Render_sous_menu_bouton(props) {
    const id = props.id;
    const top = props.top;
    const h = props.h;
    return <div id={id} className="Sous-Menu_boutons_div"
            onClick={props.onclick_function}
            onMouseOver={() => document.getElementById(id).style.backgroundColor = 'rgb(15, 15, 90)'}
            onMouseOut={() => document.getElementById(id).style.backgroundColor = 'rgb(15, 15, 140)'} 
            style={{height: h, top: top}}><p><b>{props.children}</b></p></div>
};

function Render_sous_menu(props) {
    const id = props.id2;
    if (id == "salons") {
        return <div id="sous-menu"
            onMouseLeave={() => quitter_sous_menu()}
            style={{left: '-2px', top:'0px', width:'100%', height:'400%', display: 'block', position: 'absolute'}}>
                <Render_sous_menu_bouton id="mes_salons" top='25%' h='25%' onclick_function={mes_salons}>
                    Mes salons
                </Render_sous_menu_bouton>
                <Render_sous_menu_bouton id="rejoindre_salon" top='50%' h='25%' onclick_function={rejoindre_salon}>
                    Rejoindre un salon
                </Render_sous_menu_bouton>
                <Render_sous_menu_bouton id="creer_salon" top='75%' h='25%' onclick_function={creer_salon}>
                    Créer un salon
                </Render_sous_menu_bouton>
            </div>;
    }
    if (id == "amis") {
        return <div id="sous-menu"
            onMouseLeave={() => quitter_sous_menu()}
            style={{left: '-2px', top:'0px', width:'100%', height:'300%', display: 'block', position: 'absolute'}}>
                <Render_sous_menu_bouton id="mes_amis" top='33%' h='33%'>
                    Mes amis
                </Render_sous_menu_bouton>
                <Render_sous_menu_bouton id="rechercher_amis" top='66%' h='33%'>
                    Rechercher des amis
                </Render_sous_menu_bouton>
            </div>;
    }
};


function onmouseenter_menu() {
    const react_sous_menu = document.getElementById("react_sous-menu");
    react_sous_menu.parentNode.removeChild(react_sous_menu); 
    document.getElementById(this.id).appendChild(react_sous_menu);
    this.style.backgroundColor = 'rgb(15, 15, 90)';
    React_sous_menu.render(<Render_sous_menu id2={this.id}/>);
    react_sous_menu.style.display = "block";
};

/* **************** **************** */
