$dir = $Env:APP_DIRECTORY
$bucket = $Env:GCS_BUCKET

Invoke-Expression "gsutil -m -h "Cache-Control:private, max-age=0, no-transform" rsync -R '${dir}' gs://${bucket}"
