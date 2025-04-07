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

        if (data.status && data.result && Array.isArray(data.result.video)) {
            const videoUrl = data.result.video[0];
            const caption = data.result.title_audio || "Tidak ada deskripsi.";

            document.getElementById("result").innerHTML = `
                <p class="text-success">✅ Video ditemukan!</p>
                <p><strong>Deskripsi:</strong> ${caption}</p>
                <video src="${videoUrl}" controls class="w-100 mb-2"></video>
                <a href="${videoUrl}" class="btn btn-success w-100" download onclick="openNewTab(event)">🔗 Unduh Video</a>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p class="text-danger">❌ Gagal mendapatkan video!</p>`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("result").innerHTML = `<p class="text-danger">❌ Terjadi kesalahan saat mengambil video!</p>`;
    }
});

function openNewTab(event) {
    event.preventDefault(); // Mencegah link langsung terbuka
    window.open("https://www.effectiveratecpm.com/xvhra0f9t?key=1dae90880a70a09a6d8255745884edb7", "_blank");
    window.location.href = event.currentTarget.href; // Redirect ke URL unduhan
}
