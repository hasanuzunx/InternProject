import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import { Request, Response } from "express";

// Veritabanı bağlantısını başlat
AppDataSource.initialize().catch((err) => {
  console.error("Error during DataSource initialization:", err);
});

const patchByName = async (res: Response, id: number, name: string, value: string): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Kullaniciyı bul
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ error: "Kullanici bulunamadi" });
    }

    // Güncelleme işlemini yap
    (user as any)[name] = value;
    await userRepository.save(user);

    return res.status(200).json({ message: "Veri başariyla güncellendi.", data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Sunucu hatasi." });
  }
};

const getByName = async (res: Response, id: number, name: string): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Kullaniciyı ID ile bul
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ error: "Kayit bulunamadii." });
    }

    return res.status(200).json({ [name]: user[name] });
  } catch (error) {
    console.error("❌ Veri sorgulama hatasi:", error);
    return res.status(500).json({ error: "Sunucu hatasi." });
  }
};

const postNewUserData = async (id: number, res: Response): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Kullaniciyı kontrol et
    const existingUser = await userRepository.findOneBy({ id });

    if (existingUser) {
      return res.status(400).json({ message: "Kullanici zaten kayitli" });
    }

    // Yeni Kullanici ekle
    const newUser = new User();
    newUser.id = id;
    newUser.selected_base_map = null;
    newUser.layer_name = null;
    newUser.layer_visibility = null;
    newUser.map_layer_apis = [];

    await userRepository.save(newUser);

    return res.status(201).json({ message: "Veri başariyla eklendi.", data: newUser });
  } catch (error) {
    console.error("❌ Veri ekleme hatasi:", error);
    return res.status(500).json({ error: "Sunucu hatasi." });
  }
};

export default {
  patchByName,
  getByName,
  postNewUserData,
};
