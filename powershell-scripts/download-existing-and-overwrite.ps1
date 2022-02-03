$dir = $Env:APP_DIRECTORY
$dataFromBucketDir="./dataFromBucket"
$bucket = $Env:GCS_BUCKET

Invoke-Expression -Command "mkdir ${dataFromBucketDir}"
Invoke-Expression  -Command "gsutil -m rsync -r gs://${bucket} ${dataFromBucketDir}"