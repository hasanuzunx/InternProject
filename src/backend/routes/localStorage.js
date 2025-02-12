import express from "express";
import con from "../config/db.js"
import controllerLocalStorage from "../controllers/localStorage.js";

const router = express.Router();

router.get('/layer_visibility',controllerLocalStorage.getLayerVisibility);
router.get('/layer_name', controllerLocalStorage.getLayerName);
router.get('/selectedbasemap', controllerLocalStorage.getSelectedBaseMap);
router.get('/map_layer_apis',controllerLocalStorage.getMapLayerApis);

router.post('/',controllerLocalStorage.postNewUser);

router.patch('/map_layer_apis', controllerLocalStorage.patchMapLayerApis);
router.patch('/selectedbasemap', controllerLocalStorage.patchSelectedBaseMap);
router.patch('/layer_name', controllerLocalStorage.patchLayerName);
router.patch('/layer_visibility', controllerLocalStorage.patchLayerVisibility);

export default router;