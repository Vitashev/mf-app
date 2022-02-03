$bucketName = $Env:GCS_BUCKET;
$dir = $Env:APP_DIRECTORY;
$deployPath= $Env:DEPLOY_PATH;
$path = "${dir}/${deployPath}"

Write-Output (Test-Path -Path $path);
Write-Output "SHAHHSHAHSHSA"
if ((Test-Path -Path $path) -eq $false) {
    Write-Output "App list is empty. Nothing to deploy"
}

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

Invoke-Expression "gsutil -m -h 'Cache-Control:private, max-age=0, no-transform' rsync -R '${dir}' gs://${bucketName}"
