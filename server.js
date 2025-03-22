const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public")); // Melayani file statis dari folder public

// Endpoint TikTok Downloader
app.get("/api/tiktok", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL TikTok wajib diisi!" });

    try {
        const apiUrl = `https://saipulanuar.eu.org/api/api.php/tiktokdl?url=${encodeURIComponent(url)}&apikey=bear`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data dari API eksternal" });
    }
});

// Jalankan server
app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));
