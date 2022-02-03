$dir = $Env:APP_DIRECTORY
$bucket = $Env:GCS_BUCKET

$appssssSubFolders = Get-ChildItem $dir |
Where-Object { $_.PSIsContainer } |
Foreach-Object { $_.Name }

foreach ($folder in $appssssSubFolders){
    Write-Output $folder
}

Invoke-Expression "gsutil -m -h 'Cache-Control:private, max-age=0, no-transform' rsync -R '${dir}' gs://${bucket}"
