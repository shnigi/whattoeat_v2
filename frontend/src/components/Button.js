import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const PrimaryButton = ({ onClick }) => (
    <button onClick={onClick} className="commonButtonStyles">
        <FontAwesomeIcon icon={faHeart} size="3x" color="#4ECB96"/>
    </button>
);

const SecondaryButton = ({ onClick }) => (
    <button onClick={onClick} className="commonButtonStyles">
        <FontAwesomeIcon icon={faTimes} size="3x" color="#FF6C6D"/>
    </button>
);

export {
    PrimaryButton,
    SecondaryButton,
}
