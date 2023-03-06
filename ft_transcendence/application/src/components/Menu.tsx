import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import MenuButton from "./MenuButton";

const MenuWrapper = styled.div`
    z-index: 1;
    width: 100%;
    height: 5%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    border: none;
    border-radius: 3px;
`;

const Menu = (props: any) => {

    return (
        <MenuWrapper id="menu">
            <MenuButton title="Jouer" left={10} cursor='pointer' event={() => props.navigateTo('/GameLauncher')} />
            <MenuButton
                event={() => {}}
                title="Amis"
                left={25}
                submenu={[{
                    title: "Mes amis",
                    event: () => props.navigateTo('/Friends')
                }, {
                    title: "Rechercher",
                    event: () => props.navigateTo('/Friends')
                }]}
            />
            <MenuButton
                title="Salons"
                left={40}
                submenu={[{
                    title: "Mes salons",
                    event: () => props.navigateTo('/Chanel')
                }, {
                    title: "Rejoindre",
                    event: () => props.navigateTo('/Chanel')
                }, {
                    title: "Créer",
                    event: () => props.navigateTo('/Chanel')
                }]}
            />
            <MenuButton title="Invitations" left={55} cursor='pointer' event={() => props.navigateTo('/Invitations')} />
            <MenuButton title="Mon compte" left={70} cursor='pointer' event={() => props.navigateTo('/Profile')} />
            <MenuButton title="Se déconnecter" left={85} cursor='pointer' event={props.logout} />
        </MenuWrapper>
    );
};

export default Menu;
