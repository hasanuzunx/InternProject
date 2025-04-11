import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import { Response } from "express";

// Veritabanı bağlantısını başlat
AppDataSource.initialize().catch((err) => {
  console.error("Error during DataSource initialization:", err);
});

export const patchByName = async (res: Response, id: number, name: string, value: any): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Kullaniciyı bul
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ error: "Kullanici bulunamadi" });
    }
    
    //console.log("Value type:", typeof value, "Value:", value);

    // Type kontrolü
    if (typeof value === "string") {
      (user as any)[name] = value;
    } else if (typeof value === "number") {
      (user as any)[name] = Number(value); // Integer olmalıysa sayıya çevir
    } else if (Array.isArray(value)) {
      if (value.every(item => typeof item === "string")) {
        (user as any)[name] = value; // String array ise direkt ata
      } else {
        return res.status(400).json({ error: "Geçersiz array formatı" });
      }
    } else {
      return res.status(400).json({ error: "Geçersiz veri türü" });
    }

    await userRepository.save(user);

    return res.status(200).json({ message: "Veri başariyla güncellendi.", data: user });
  } catch (err) {
    return res.status(500).json({ error: "Sunucu hatasi." });
  }
};



export const getByName = async (res: Response, id: number, name: string): Promise<Response> => {
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

export const postNewUserData = async (id: number, res: Response): Promise<Response> => {
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

