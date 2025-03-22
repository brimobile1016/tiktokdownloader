const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/api/tiktok", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL TikTok wajib diisi!" });

    try {
        const apiUrl = `https://saipulanuar.eu.org/api/api.php/tiktokdl?url=${encodeURIComponent(url)}&apikey=bear`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data" });
    }
});

// Export handler untuk Vercel
module.exports = app;
