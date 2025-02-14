import "../baseMapSelecter.css";
import { useContext } from "react";
import { MapContext } from "../App";
import React from "react";


function BaseMapSelecter() {
    const context = useContext(MapContext);
    if (!context) {
    throw new Error("BaseMapSelecter must be used within a MapContext.Provider");
    }

    const { selectedBaseMap, setSelectedBaseMap } = context;


    return (
        <div className="selecter">
            <div>
                <button
                    onClick={() => setSelectedBaseMap(1)}
                    id="basemap1"
                    className={selectedBaseMap === 1 ? "selected" : ""}
                ></button>
                <label htmlFor="basemap1">Classic</label>
            </div>
            <div>
                <button
                    onClick={() => setSelectedBaseMap(2)}
                    id="basemap2"
                    className={selectedBaseMap === 2 ? "selected" : ""}
                ></button>
                <label htmlFor="basemap2">Satellite</label>
            </div>
            <div>
                <button
                    onClick={() => setSelectedBaseMap(3)}
                    id="basemap3"
                    className={selectedBaseMap === 3 ? "selected" : ""}
                ></button>
                <label htmlFor="basemap3">Black and white</label>
            </div>
            <div>
                <button
                    onClick={() => setSelectedBaseMap(4)}
                    id="basemap4"
                    className={selectedBaseMap === 4 ? "selected" : ""}
                ></button>
                <label htmlFor="basemap4">Smooth dark</label>
            </div>
        </div>
    );
}

export default BaseMapSelecter;
