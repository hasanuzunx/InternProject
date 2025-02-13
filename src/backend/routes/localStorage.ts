import express, { Router } from 'express';
import controllerLocalStorage from '../controllers/localStorage'; // Import path'lerini kontrol et

const router: Router = express.Router();

// GET istekleri
router.get('/layer_visibility', controllerLocalStorage.getLayerVisibility);
router.get('/layer_name', controllerLocalStorage.getLayerName);
router.get('/selectedbasemap', controllerLocalStorage.getSelectedBaseMap);
router.get('/map_layer_apis', controllerLocalStorage.getMapLayerApis);

// POST isteği
router.post('/', controllerLocalStorage.postNewUser);

// PATCH istekleri
router.patch('/map_layer_apis', controllerLocalStorage.patchMapLayerApis);
router.patch('/selectedbasemap', controllerLocalStorage.patchSelectedBaseMap);
router.patch('/layer_name', controllerLocalStorage.patchLayerName);
router.patch('/layer_visibility', controllerLocalStorage.patchLayerVisibility);

export default router;
