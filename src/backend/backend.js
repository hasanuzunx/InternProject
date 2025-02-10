import pkg from "pg";
const { Client } = pkg;
import express from "express";
const app = express();
app.use(express.json())

const con = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"314",
    database:"localstorage"
})

con.connect().then(() =>console.log("connected"))

app.listen(3000);

app.get('/api/layer_visibility', async (req, res) => {
    const { id } = req.body;  // id'yi URL'den almak için req.query kullanıyoruz.
    const numericId = parseInt(id);  

    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }

    

    try {
        const result = await con.query("SELECT layer_visibility FROM localhost WHERE id = $1", [numericId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kayit bulunamadi." });
        }

        res.status(200).json({ layer_visibility: result.rows[0].layer_visibility });
    } catch (error) {
        console.error("❌ Veri sorgulama hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});

app.get('/api/layer_name', async (req, res) => {
    const { id } = req.body;  // id'yi URL'den almak için req.query kullanıyoruz.
    const numericId = parseInt(id);  

    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }

    

    try {
        const result = await con.query("SELECT layer_name FROM localhost WHERE id = $1", [numericId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kayit bulunamadi." });
        }

        res.status(200).json({ layer_name: result.rows[0].layer_name });
    } catch (error) {
        console.error("❌ Veri sorgulama hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});


app.get('/api/selectedbasemap', async (req, res) => {
    const { id } = req.body;  // id'yi URL'den almak için req.query kullanıyoruz.

    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }

    const numericId = parseInt(id);  // Eğer id sayısal bir değer ise

    try {
        const result = await con.query("SELECT selectedbasemap FROM localhost WHERE id = $1", [numericId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kayit bulunamadi." });
        }

        res.status(200).json({ selectedbasemap: result.rows[0].selectedbasemap });
    } catch (error) {
        console.error("❌ Veri sorgulama hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});



app.get('/api/map_layer_apis', async (req, res) => {
    const { id } = req.body;  // id'yi URL'den almak için req.query kullanıyoruz.

    if (!id) {
        return res.status(400).json({ error: "ID eksik." });
    }

    const numericId = parseInt(id);  // Eğer id sayısal bir değer ise

    try {
        const result = await con.query("SELECT map_layer_apis FROM localhost WHERE id = $1", [numericId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kayit bulunamadi." });
        }

        res.status(200).json({ map_layer_apis: result.rows[0].map_layer_apis });
    } catch (error) {
        console.error("❌ Veri sorgulama hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});





app.post('/api/localstorage', async (req, res) => {
    
    const { id } = req.body; 
    //console.log(numericId)

    if (!id) {
        return res.status(400).json({ error: "ID veya selectedbasemap eksik." });
    }

    try {
        const user = await con.query("SELECT * FROM localhost WHERE id = $1", [id]);
        console.log(user)
        if(user.rows.length > 0){
            // Eğer kayıt varsa, veriyi güncelle
            /*
            const updateResult = await con.query(
                "UPDATE localhost SET selectedbasemap = $1 WHERE id = $2 RETURNING *", 
                [selectedbasemap,numericId]
            );
            */
            res.status(400).json({ message: "kullanici zaten kayitli"});
        
        }
        else{
            const result = await con.query(
            `
            INSERT INTO localhost (id, selectedbasemap, layer_visibility, layer_name, map_layer_apis)
            VALUES ($1, NULL, NULL, NULL, NULL)
            RETURNING *;
            `, 
            [id]
            );
            res.status(201).json({ message: "Veri başariyla eklendi.", data: result.rows[0] });
        }

        
    } catch (error) {
        console.error("❌ Veri ekleme hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});




app.patch('/api/map_layer_apis', async (req,res) =>{
    const {id, map_layer_apis } = req.body; 
    if (!map_layer_apis) {
        return res.status(400).json({ error: "map_layer_apis eksik." });
    }

    try{
        const updateResult = await con.query(
            "UPDATE localhost SET map_layer_apis = $1 WHERE id = $2 RETURNING *", 
            [map_layer_apis, id]
        );
        res.status(200).json({ message: "Veri başariyla güncellendi.", data: updateResult});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});

app.patch('/api/selectedbasemap', async (req,res) =>{
    const {id, selectedbasemap } = req.body; 
    if (!selectedbasemap) {
        return res.status(400).json({ error: "selectedbasemap eksik." });
    }

    try{
        const updateResult = await con.query(
            "UPDATE localhost SET selectedbasemap = $1 WHERE id = $2 RETURNING *", 
            [selectedbasemap, id]
        );
        res.status(200).json({ message: "Veri başariyla güncellendi.", data: updateResult});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});

app.patch('/api/layer_name', async (req,res) =>{
    const {id, layer_name } = req.body; 
    if (!layer_name) {
        return res.status(400).json({ error: "layer_name eksik." });
    }

    try{
        const updateResult = await con.query(
            "UPDATE localhost SET layer_name = $1 WHERE id = $2 RETURNING *", 
            [layer_name, id]
        );
        res.status(200).json({ message: "Veri başariyla güncellendi.", data: updateResult});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});

app.patch('/api/layer_visibility', async (req,res) =>{
    const {id, layer_visibility } = req.body; 
    if (!layer_visibility) {
        return res.status(400).json({ error: "layer_visibility eksik." });
    }

    try{
        const updateResult = await con.query(
            "UPDATE localhost SET layer_visibility = $1 WHERE id = $2 RETURNING *", 
            [layer_visibility, id]
        );
        res.status(200).json({ message: "Veri başariyla güncellendi.", data: updateResult});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
});

