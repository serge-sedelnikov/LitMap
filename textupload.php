<?php
$target_dir = "data/";
$data = $_POST["data"];
$targetFileName = $_POST["targetFileName"];
$target_file = $target_dir. $targetFileName;
$uploadOk = 1;

if (file_put_contents($target_file, $data)) {
    echo "The file ". $target_file. " has been uploaded.";
} else {
    echo "Sorry, there was an error uploading your file.";
}
?>
