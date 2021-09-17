const moduleURL = 'http://localhost:3000/myModule.ts'

if (typeof window === 'undefined') {

  const axios = require('axios')
  const { transform } = require('esbuild')
  
  const compile = async (code) => {
    const output = await transform(code, {
      target: 'node' + process.versions.node.split('.')[0],
      format: 'cjs',
      minify: true,
    })
    return output.code
  }
  
  const docompile = async (url, options = {}, code = '') => {
    if (typeof url !== 'string') {
      throw new TypeError('Expected a string')
    }
  
    const response = await axios({
      method: 'GET',
      url,
      ...options
    })
    let string = response.data.toString()
    if (code) {
      string += '\n' + code
    }
  
    // @ts-ignore
    const _module = new module.constructor()
    _module.filename = url
    _module._compile(await compile(string), url)
  
    return _module.exports
  }

  docompile(moduleURL).then((mymodule) => {
    mymodule.default()
  })

} else {

  import(/* @vite-ignore */ moduleURL).then((mymodule) => {
    mymodule.default()
  })

}