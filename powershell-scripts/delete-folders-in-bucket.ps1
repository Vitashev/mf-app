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

$cleanUpCommand = "gsutil -m rm -r ${paths} || exit 0"

try {
    Write-Output 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    Invoke-Expression -Command $cleanUpCommand -ErrorAction Continue
}
catch {
    Write-Output 'No files to delete'
}
