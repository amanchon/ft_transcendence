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
`;

const Menu = (props: any) => {

    return (
        <MenuWrapper id="menu">
            <MenuButton title="Jouer" left={10} cursor='pointer' />
            <MenuButton
                title="Amis"
                left={25}
                submenu={["Mes amis", "Rechercher des amis"]}
            />
            <MenuButton title="Salons" left={40} />
            <MenuButton title="Invitations" left={55} cursor='pointer' />
            <MenuButton title="Mon compte" left={70} cursor='pointer' />
            <MenuButton title="Se déconnecter" left={85} cursor='pointer' />
        </MenuWrapper>
    );
};

export default Menu;
