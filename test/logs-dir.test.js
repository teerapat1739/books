const fs = require('fs')
const path = require('path')

describe("Checking logs dir", () => {
  const log_path = path.join(process.cwd(), 'logs')
  test(`${log_path} must exist`, () => {
    expect(fs.existsSync(log_path)).toBeTruthy()
    expect(fs.lstatSync(log_path).isDirectory()).toBeTruthy()
  })
})