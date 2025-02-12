import localStorageService from "../services/localStorageServices.js"

const getByNameFunc = localStorageService.getByName
const patchByNameFunc = localStorageService.patchByName
const postNewUserDataFunc = localStorageService.postNewUserData

const getLayerVisibility = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    getByNameFunc(res,id,"layer_visibility");
}

const getSelectedBaseMap = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    getByNameFunc(res,id,"selectedbasemap");
}

const getLayerName = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    getByNameFunc(res,id,`layer_name`);
}

const getMapLayerApis = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    getByNameFunc(res,id,"map_layer_apis");
}




const patchMapLayerApis = async (req,res) =>{
    const {id, map_layer_apis } = req.body; 
    if (!map_layer_apis) {
        return res.status(400).json({ error: "map_layer_apis eksik." });
    }
    patchByNameFunc(res,id,"map_layer_apis",map_layer_apis)
};

const patchSelectedBaseMap =  async (req,res) =>{
    const {id, selectedbasemap } = req.body; 
    if (!selectedbasemap) {
        return res.status(400).json({ error: "selectedbasemap eksik." });
    }
    patchByNameFunc(res,id,"selectedbasemap",selectedbasemap)
}

const patchLayerName =  async (req,res) =>{
    const {id, layer_name } = req.body; 
    if (!layer_name) {
        return res.status(400).json({ error: "layer_name eksik." });
    }
    
    patchByNameFunc(res,id,"layer_name",layer_name)
}

const patchLayerVisibility = async (req,res) =>{
    const {id, layer_visibility } = req.body; 
    if (!layer_visibility) {
        return res.status(400).json({ error: "layer_visibility eksik." });
    }
    patchByNameFunc(res,id,"layer_visibility",layer_visibility)
}




const postNewUser = async(req,res) => {
    const { id } = req.body; 
    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }
    postNewUserDataFunc(id,res)
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
