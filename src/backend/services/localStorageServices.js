import con from "../config/db.js"

const patchByName = async (res,id,name,value) =>{
    try{
        console.log(name)
        console.log(value)
        const string = "UPDATE localhost SET "+name+" = '"+value+"' WHERE id = " + id + " RETURNING *";
        const updateResult = await con.query(string);
        res.status(200).json({ message: "Veri başariyla güncellendi.", data: updateResult});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
}




const getByName = async(res,id,name) => { 
    try {
        const string = "Select "+ name + " FROM localhost WHERE id = " + id;
        const result = await con.query(string);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kayit bulunamadi." });
        }

        res.status(200).json({ [name]: result.rows[0][name]});
    } catch (error) {
        console.error("❌ Veri sorgulama hatasi:", error);
        res.status(500).json({ error: "Sunucu hatasi." });
    }
}



const postNewUserData = async(id,res) => {

    try {
        const user = await con.query("SELECT * FROM localhost WHERE id = $1", [id]);
        console.log(user)
        if(user.rows.length > 0){
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
}

export default {
    patchByName,
    getByName,
    postNewUserData
}