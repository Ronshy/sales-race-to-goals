<?php
require_once 'config.php';
require_once 'supabase.php';

header('Content-Type: application/json');

$division_id = $_GET['division_id'] ?? null;
if (!$division_id) {
    http_response_code(400);
    echo json_encode(['error' => 'division_id is required']);
    exit;
}

$query = "select=id,name,sales_logs(sales_point),lead_measures(kunjungan,telepon,chat)&division_id=eq.$division_id";
echo json_encode(supabase_fetch('users', $query));
