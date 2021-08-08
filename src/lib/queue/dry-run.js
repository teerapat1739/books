const fs = require('fs')
const path = require('path')

const DRY_RUN_PATH = path.join(process.cwd(), 'dry-run')
const save_response_cb = (method, uri, status_code, data, response_headers, cb) => {
  console.log(uri)
  fs.writeFileSync(path.join(DRY_RUN_PATH, `${encodeURIComponent(uri.split('?')[0])}_${method}_${status_code >= 200 && status_code < 300 ? 'SUCCESS' : 'FAIL'}.json`), JSON.stringify({ status_code, data, response_headers }), 'utf8')
  cb()
}

module.exports = {
  save_response_cb
}