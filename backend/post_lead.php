<?php
require_once 'config.php';
require_once 'supabase.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'], $data['kunjungan'], $data['telepon'], $data['chat'], $data['log_date'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

echo json_encode(supabase_insert('lead_measures', $data));
