

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
  
    const _module = new module.constructor()
    _module.filename = url
    _module._compile(await compile(string), url)
  
    return _module.exports
  }

  docompile('http://localhost:3000/myModule.ts').then((mymodule) => {
    mymodule.default()
  })

} else {

  import('http://localhost:3000/myModule.ts').then((mymodule) => {
    mymodule.default()
  })

}