$bucketName = $Env:GCS_BUCKET;
$dir = $Env:APP_DIRECTORY;
$deployPath = $Env:DEPLOY_PATH;
$path = "${dir}/${deployPath}"

if (-not (Test-Path -Path $path)) {
    Write-Output "App list is empty. Nothing to deploy"
    EXIT
}

$appSubFolders = Get-ChildItem $path |
Where-Object { $_.PSIsContainer } |
Foreach-Object { $_.Name }

$paths = '';

foreach ($folder in $appSubFolders) {
    $paths += " gs://${bucketName}/${deployPath}/${folder}/*"
}

# Delete app's artifacts in bucket
$cleanUpCommand = "gsutil -m rm -r ${paths} || exit 0"

try {
    Invoke-Expression -Command $cleanUpCommand -ErrorAction Continue
}
catch {
    Write-Output 'No files to delete'
}

# Upload app's artifacts
Invoke-Expression "gsutil -m -h 'Cache-Control:private, max-age=0, no-transform' rsync -R '${dir}' gs://${bucketName}"

# Setting up serving for index.html
$shellAppName= $Env:SHELL_APP_NAME;
$indexFilePath = "${deployPath}/${shellAppName}/index.html";
Write-Output "INDEX -------- ${indexFilePath}"
Invoke-Expression "gsutil web set -m ${indexFilePath} gs://${bucketName}"
Invoke-Expression "gsutil web set -e ${indexFilePath} gs://${bucketName}"
