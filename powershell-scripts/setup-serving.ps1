$bucket = $Env:GCS_BUCKET
$deployPath= $Env:DEPLOY_PATH;
$shellAppName= $Env:SHELL_APP_NAME;

$indexFilePath = "${deployPath}/${shellAppName}/index.html";

Invoke-Expression "gsutil web set -m ${indexFilePath} gs://${bucket}"
Invoke-Expression "gsutil web set -e ${indexFilePath} gs://${bucket}"
