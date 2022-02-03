$dir = $Env:APP_DIRECTORY
$dataFromBucketDir="./dataFromBucket"
$bucket = $Env:GCS_BUCKET

Invoke-Expression  -Command "gsutil -m rsync -r -x 'apps/*' gs://${bucket} ${dataFromBucketDir}"