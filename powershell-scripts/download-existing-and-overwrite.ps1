$bucketName = $Env:GCS_BUCKET;
$dir = $Env:APP_DIRECTORY;
$deployPath = $Env:DEPLOY_PATH;
$path = "${dir}/${deployPath}"
$dataFromBucketDir = "./dataFromBucket"
$dataFromBucketDeploymentDir = "${dataFromBucketDir}/${deployPath}"

Invoke-Expression -Command "mkdir ${dataFromBucketDir}"
Invoke-Expression  -Command "gsutil -m rsync -r gs://${bucketName} ${dataFromBucketDir}"

$appSubFolders = Get-ChildItem $dataFromBucketDeploymentDir |
Where-Object { $_.PSIsContainer } |
Foreach-Object { $_.Name }

foreach ($folder in $appSubFolders) {
    $folderToCopy = "${dataFromBucketDeploymentDir}/${folder}";

    if (Test-Path -Path $folder) {
        Write-Output "${folder} exists. Won't be copied"
    }
    else {
        Copy-Item "${folderToCopy}" -Destination $path
        Write-Output "${folder} copied"
    }
}