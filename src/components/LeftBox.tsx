import BaseMapSelecter from "./BaseMapSelecter";
import './styles/leftBox.css';
import LayerList from "./LayerList";
import React from "react";

function LeftBox(){

    return(
        <div className="leftBox">
            <BaseMapSelecter />
            <LayerList/>
        </div>
    );
}

export default LeftBox;