$dir = $Env:APP_DIRECTORY;
$appsFolderName = 'apps';
$path = "${dir}/${appsFolderName}"
$bucketName = $Env:GCS_BUCKET;

$paths = '';

$arr = Get-ChildItem $path |
    Where-Object {$_.PSIsContainer} |
    Foreach-Object {$_.Name}
            

foreach ($folder in $arr){
    $paths += " gs://${bucketName}/${appsFolderName}/${folder}/*"
}

$cleanUpCommand = "gsutil -m rm -r ${paths}"

Invoke-Expression $cleanUpCommand