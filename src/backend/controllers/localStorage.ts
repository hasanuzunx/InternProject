import {Request, Response } from "express";
import {
    getByName,
    patchByName,
    postNewUserData
} from "../services/localStorageServices"

// Layer Visibility'yi almak için GET isteği
export const getLayerVisibility = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.query; // id'yi query string'den alıyoruz
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByName(res, id, "layer_visibility");
}

// Selected BaseMap'i almak için GET isteği
export const getSelectedBaseMap = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.query; // id'yi query string'den alıyoruz
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByName(res, id, "selected_base_map");
}

// Layer Name'i almak için GET isteği
export const getLayerName = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.query; // id'yi query string'den alıyoruz
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByName(res, id, "layer_name");
}

// Map Layer APIs'yi almak için GET isteği
export const getMapLayerApis = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.query; // id'yi query string'den alıyoruz
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByName(res, id, "map_layer_apis");
}





export const patchMapLayerApis = async (req: Request,res: Response): Promise<Response> =>{
    const {id, map_layer_apis }:{id?:number , map_layer_apis?:string[]} = req.body; 
    if (!map_layer_apis) {
        return res.status(400).json({ error: "map_layer_apis eksik." });
    }
    return patchByName(res,id,"map_layer_apis",map_layer_apis)
};

export const patchSelectedBaseMap =  async (req: Request,res: Response): Promise<Response> =>{
    const { id, selected_base_map }:{id?:number , selected_base_map?:number} = req.body;
    if (!selected_base_map) {
        return res.status(400).json({ error: "selectedbasemap eksik." });
    }
    return patchByName(res,id,"selected_base_map",selected_base_map)
}

export const patchLayerName =  async (req: Request,res: Response): Promise<Response> =>{
    const {id, layer_name }:{id?:number , layer_name?:string} = req.body; 
    if (!layer_name) {
        return res.status(400).json({ error: "layer_name eksik." });
    }
    
    return patchByName(res,id,"layer_name",layer_name)
}


export const patchLayerVisibility = async (req: Request,res: Response): Promise<Response> =>{
    const {id, layer_visibility }:{id?:number , layer_visibility?:string} = req.body; 
    if (!layer_visibility) {
        return res.status(400).json({ error: "layer_visibility eksik." });
    }
    return patchByName(res,id,"layer_visibility",layer_visibility)
}

export const postNewUser = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.body; 
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return postNewUserData(id, res);
}



