import { PrimaryButton, SecondaryButton } from "./Button";
import React, { ComponentType } from "react";

interface ButtonProps {
    left: () => void;
    right: () => void;
};

const CardButtons: ComponentType<ButtonProps> = ({ left, right }) => (
    <div className="buttonContainer">
        <SecondaryButton onClick={left}></SecondaryButton>
        <PrimaryButton onClick={right}></PrimaryButton>
    </div>
);

export default CardButtons;