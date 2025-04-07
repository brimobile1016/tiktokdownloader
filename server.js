const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Middleware untuk menjadikan folder public sebagai folder publik di root URL
app.use(express.static(path.resolve(__dirname, 'public')));

// Endpoint TikTok Downloader
app.post("/api/tiktok", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL TikTok wajib diisi!" });

    try {
        const apiUrl = `https://api.saipulanuar.eu.org/api/download/ttdl?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data dari API eksternal" });
    }
});

// **Tambahkan Route Utama**
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
