import BaseMapSelecter from "./BaseMapSelecter";
import '../leftBox.css';
import LayerList from "./LayerList";

function LeftBox(){

    return(
        <div className="leftBox">
            <BaseMapSelecter />
            <LayerList/>
        </div>
    );
}

export default LeftBox;