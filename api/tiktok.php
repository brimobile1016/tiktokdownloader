<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (!isset($_GET["url"])) {
    echo json_encode(["error" => "URL tidak ditemukan"]);
    exit;
}

$url = urlencode($_GET["url"]);
$apiKey = "bear";
$apiUrl = "https://saipulanuar.eu.org/api/api.php/tiktokdl?url=$url&apikey=$apiKey";

// Fetch data dari API TikTok
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

if ($data && isset($data["url"])) {
    echo json_encode([
        "status" => true,
        "download_url" => $data["url"],
        "caption" => $data["caption"] ?? "No caption available"
    ]);
} else {
    echo json_encode(["status" => false, "message" => "Gagal mendapatkan video"]);
}
?>
