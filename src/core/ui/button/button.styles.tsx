import styled, { css } from "styled-components";

import { IButtonProperties } from "./button.component";

const googleButtonStylesOverride = css`
  background-color: #4285f4;
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const invertedButtonStylesOverride = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const defaultButtonStylesOverride = css`
  color: white;
  background-color: black;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const buttonStyles = css`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const getCustomButtonStyles = (props: IButtonProperties) => {
  const { invertedButton, googleButton } = props;
  if (!!invertedButton) {
    return invertedButtonStylesOverride;
  } else if (!!googleButton) {
    return googleButtonStylesOverride;
  } else {
    return defaultButtonStylesOverride;
  }
};

export const StyledButton = styled.button`
  ${buttonStyles}
  ${getCustomButtonStyles}
`;
