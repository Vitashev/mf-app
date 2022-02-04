$bucketName = $Env:GCS_BUCKET;
$dir = $Env:APP_DIRECTORY;
$deployPath= $Env:DEPLOY_PATH;
$path = "${dir}/${deployPath}"

$appSubFolders = Get-ChildItem $path |
  Where-Object {$_.PSIsContainer} |
  Foreach-Object {$_.Name}

$paths = '';

foreach ($folder in $appSubFolders){
  $paths += " gs://${bucketName}/${deployPath}/${folder}/*"
}

$cleanUpCommand = "gsutil -m rm -r ${paths} || exit 0"

try {
    Invoke-Expression -Command $cleanUpCommand -ErrorAction Continue
}
catch {
    Write-Output 'No files to delete'
    exit 0
}
