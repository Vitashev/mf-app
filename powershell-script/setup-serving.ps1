Invoke-Expression 'gsutil web set -m apps/shell/index.html gs://$GCS_BUCKET'
Invoke-Expression 'gsutil web set -e apps/shell/index.html gs://$GCS_BUCKET'