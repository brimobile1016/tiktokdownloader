document.getElementById("download-btn").addEventListener("click", async () => {
    const url = document.getElementById("tiktok-url").value;
    if (!url) {
        alert("Masukkan URL TikTok terlebih dahulu!");
        return;
    }

    document.getElementById("result").innerHTML = "⏳ Sedang mengambil video...";

    try {
        const response = await fetch(`/api/tiktok`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (data.url) {
            document.getElementById("result").innerHTML = `
                <p class="text-success">✅ Video ditemukan!</p>
                <p><strong>Deskripsi:</strong> ${data.caption || "Tidak ada deskripsi."}</p>
                <video src="${data.url}" controls class="w-100 mb-2"></video>
                <a href="${data.url}" class="btn btn-success w-100" download>🔗 Unduh Video</a>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p class="text-danger">❌ Gagal mendapatkan video!</p>`;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `<p class="text-danger">❌ Terjadi kesalahan!</p>`;
    }
});
