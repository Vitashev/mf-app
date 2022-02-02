$folders = Get-ChildItem -Path $APP_DIRECTORY -Directory -Force -ErrorAction SilentlyContinue | Select-Object FullName;

foreach ($folder in $folders){
  Write-Output $folder
}