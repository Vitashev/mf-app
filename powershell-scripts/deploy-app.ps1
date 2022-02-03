$dir = $Env:APP_DIRECTORY
$bucket = $Env:GCS_BUCKET
$deployPath= $Env:DEPLOY_PATH;

Invoke-Expression "gsutil -m rsync -R '${dir}' gs://${bucket}/${deployPath}"
