import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.div`
    top: ${(props: {cursor: string, top: number, left: number}) => ((props.top.toString() + "%"))};
    left: ${(props: {cursor: string, top: number, left: number}) => ((props.left.toString() + "%"))};
    cursor: ${(props: {cursor: string, top: number, left: number}) => (props.cursor)};
    z-index: 3;
    width: 15%;
    height: 100%;
    position: absolute;
    display: block;
    border: 2px solid black;
    background-color: rgb(15, 15, 140);
    text-align: center;
    font-family: Arial;
    font-size: 16px;
    color: white;
    &:hover {
        background-color: rgb(15, 15, 90);
    }
`;

const ButtonText = styled.p`
    margin-top: 0.7em;
    font-weight: bold;
`;

const SubMenuWrapper = styled.div`
    left: -2px;
    top: 0px;
    width: 100%;
    height: ${(props: { height: number }) => ((props.height.toString() + "%"))};
    display: block;
    position: absolute;
`;

const SubmenuButton = styled.div`
    top: ${(props: { top: number, height: number }) => ((props.top.toString() + "%"))};
    left: 0;
    cursor: pointer;
    z-index: 3;
    width: 100%;
    height: ${(props: { top: number, height: number }) => ((props.height.toString() + "%"))};
    position: absolute;
    display: block;
    border: 2px solid black;
    background-color: rgb(15, 15, 140);
    text-align: center;
    font-family: Arial;
    font-size: 16px;
    color: white;
    &:hover {
        background-color: rgb(15, 15, 90);
    }
`;

const MenuButton = (props: any) => {
    return (
        <Button
            top={props.top ? props.top : '0'}
            id={"menu-button-" + props.title}
            left={props.left ? props.left : '0'}
            cursor={props.cursor ? props.cursor : ''}
        >
            <ButtonText>{props.title}</ButtonText>
            {props.submenu && props.submenu.length && <SubMenuWrapper height={100 + 100 * props.submenu.length}>
                {props.submenu.map((e: string, index: number) => {
                    return (
                        <SubmenuButton
                            id={"menu-button" + e + "-" + index.toString()}
                            top={(index + 1) * Math.floor(100 / (props.submenu.length + 1))}
                            height={Math.floor(100 / (props.submenu.length + 1))}
                        >
                            <ButtonText>{e}</ButtonText>
                        </SubmenuButton>
                    );
                })}
            </SubMenuWrapper>}
        </Button>
    )
};

export default MenuButton;