import express, { Router } from 'express';
import {
  getLayerVisibility,
  getLayerName,
  getSelectedBaseMap,
  getMapLayerApis,
  postNewUser,
  patchMapLayerApis,
  patchSelectedBaseMap,
  patchLayerName,
  patchLayerVisibility
} from '../controllers/localStorage'; 

const router: Router = express.Router();

// 🟢 GET İstekleri
router.get('/layer_visibility', getLayerVisibility);
router.get('/layer_name', getLayerName);
router.get('/selected_base_map', getSelectedBaseMap);
router.get('/map_layer_apis', getMapLayerApis);

// 🔵 POST İsteği
router.post('/', postNewUser);

// 🟠 PATCH İstekleri
router.patch('/map_layer_apis', patchMapLayerApis);
router.patch('/selected_base_map', patchSelectedBaseMap);
router.patch('/layer_name', patchLayerName);
router.patch('/layer_visibility', patchLayerVisibility);

export default router;
