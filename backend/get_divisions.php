<?php
require_once 'config.php';
require_once 'supabase.php';

header('Content-Type: application/json');
echo json_encode(supabase_fetch('divisions'));
