$dir = $Env:APP_DIRECTORY
$bucket = $Env:GCS_BUCKET

Invoke-Expression "gsutil -m rsync -R "${dir}" gs://${bucket}"
