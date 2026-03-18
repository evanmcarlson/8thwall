# Web Workers

This project demonstrates two approaches to using web workers in an 8th Wall hosted experience: by uploading a worker script as an asset bundle or by creating an inline worker.

1. Asset bundle: create the script in an external IDE, click + next to *assets* in the cloud editor > *new asset bundle* > *other*. Drag and drop your worker script into the asset bundle modal and ensure the main file is set to the worker script.

2. Inline worker: create a blob with a stringified version of the worker script and an associated blob url.

You can then create the worker and communicate with it as demonstrated in app.js
