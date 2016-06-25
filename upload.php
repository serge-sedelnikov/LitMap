<?php
$target_dir = "data/". $_POST["dir"]. "/";
$fileParamName = $_POST["fileNameParam"];
$targetFileName = $_POST["targetFileName"];
$target_file = $target_dir. $targetFileName;
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Check file size
if ($_FILES[$fileParamName]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "md") {
    echo "Sorry, only MD files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
}
else {
  if (move_uploaded_file($_FILES[$fileParamName]["tmp_name"], $target_file)) {
      echo "The file ". $target_file. " has been uploaded.";
  } else {
      echo "Sorry, there was an error uploading your file.";
  }
}
?>
