import localStorageService from "../services/localStorageServices"
import { Request, Response } from "express";


const getByNameFunc = localStorageService.getByName
const patchByNameFunc = localStorageService.patchByName
const postNewUserDataFunc = localStorageService.postNewUserData

const getLayerVisibility = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByNameFunc(res,id,"layer_visibility");
}

const getSelectedBaseMap = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByNameFunc(res,id,"selectedbasemap");
}

const getLayerName = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id: number } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByNameFunc(res,id,`layer_name`);
}

const getMapLayerApis = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return getByNameFunc(res,id,"map_layer_apis");
}




const patchMapLayerApis = async (req: Request,res: Response): Promise<Response> =>{
    const {id, map_layer_apis } = req.body; 
    if (!map_layer_apis) {
        return res.status(400).json({ error: "map_layer_apis eksik." });
    }
    return patchByNameFunc(res,id,"map_layer_apis",map_layer_apis)
};

const patchSelectedBaseMap =  async (req: Request,res: Response): Promise<Response> =>{
    const {id, selectedbasemap } = req.body; 
    if (!selectedbasemap) {
        return res.status(400).json({ error: "selectedbasemap eksik." });
    }
    return patchByNameFunc(res,id,"selectedbasemap",selectedbasemap)
}

const patchLayerName =  async (req: Request,res: Response): Promise<Response> =>{
    const {id, layer_name } = req.body; 
    if (!layer_name) {
        return res.status(400).json({ error: "layer_name eksik." });
    }
    
    return patchByNameFunc(res,id,"layer_name",layer_name)
}


const patchLayerVisibility = async (req: Request,res: Response): Promise<Response> =>{
    const {id, layer_visibility }: { id: number; layer_visibility: string } = req.body; 
    if (!layer_visibility) {
        return res.status(400).json({ error: "layer_visibility eksik." });
    }
    return patchByNameFunc(res,id,"layer_visibility",layer_visibility)
}

const postNewUser = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: number } = req.body; 
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    return postNewUserDataFunc(id, res);
}


export default {
    postNewUser,
    getLayerName,
    getLayerVisibility,
    getMapLayerApis,
    getSelectedBaseMap,
    patchLayerName,
    patchLayerVisibility,
    patchMapLayerApis,
    patchSelectedBaseMap
};
