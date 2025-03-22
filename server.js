const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware untuk membaca JSON dari body
app.use(express.static("public")); // Melayani file statis dari folder public

// Halaman utama menampilkan teks "akudisini"
// app.get("/", (req, res) => {
//    res.send("akudisini");
// });

// Endpoint TikTok Downloader (Menggunakan POST)
app.post("/api/tiktok", async (req, res) => {
    const { url } = req.body; // Mengambil URL dari body, bukan query string
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
