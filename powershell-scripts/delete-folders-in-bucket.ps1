$bucketName = $Env:GCS_BUCKET;
$dir = $Env:APP_DIRECTORY;
$appsFolderName = 'apps';
$path = "${dir}/${appsFolderName}"

$appSubFolders = Get-ChildItem $path |
  Where-Object {$_.PSIsContainer} |
  Foreach-Object {$_.Name}

$paths = '';

foreach ($folder in $appSubFolders){
  $paths += " gs://${bucketName}/${appsFolderName}/${folder}/*"
}

$cleanUpCommand = "gsutil -m rm -r ${paths} || 'No files to delete'"

try {
    Invoke-Expression $cleanUpCommand
}
catch {
    Write-Output 'No files to delete'
}
