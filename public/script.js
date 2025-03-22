async function downloadTikTok() {
    let url = document.getElementById("tiktokUrl").value;

    if (!url) {
        alert("Masukkan URL TikTok terlebih dahulu!");
        return;
    }

    let apiUrl = `/api/tiktok.php?url=${encodeURIComponent(url)}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.status) {
            document.getElementById("result").innerHTML = `
                <p class="text-success">✅ Video ditemukan!</p>
                <video src="${data.download_url}" controls class="w-100 mb-2"></video>
                <a href="${data.download_url}" class="btn btn-success w-100" download>🔗 Unduh Video</a>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p class="text-danger">❌ Gagal mendapatkan tautan unduhan!</p>`;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `<p class="text-danger">❌ Terjadi kesalahan. Coba lagi!</p>`;
    }
}
