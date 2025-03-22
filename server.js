const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public")); // Menyajikan file statis dari folder "public"

app.get("/api/tiktok", async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL TikTok diperlukan!" });
    }

    try {
        const apiUrl = `https://saipulanuar.eu.org/api/api.php/tiktokdl?url=${encodeURIComponent(url)}&apikey=bear`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.url) {
            res.json({
                status: true,
                videoUrl: data.url,
                caption: data.caption || "Tidak ada deskripsi",
            });
        } else {
            res.status(500).json({ error: "Gagal mendapatkan video TikTok!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
