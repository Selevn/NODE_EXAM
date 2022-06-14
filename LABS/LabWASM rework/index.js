const fs = require('fs')
//test
var wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,135,128,128,128,0,1,96,2,127,127,1,127,3,132,128,128,128,0,3,0,0,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,156,128,128,128,0,4,6,109,101,109,111,114,121,2,0,3,115,117,109,0,0,3,115,117,98,0,1,3,109,117,108,0,2,10,165,128,128,128,0,3,135,128,128,128,0,0,32,1,32,0,106,11,135,128,128,128,0,0,32,0,32,1,107,11,135,128,128,128,0,0,32,1,32,0,108,11]);
let wasmImports = {}
var wasmModule = new WebAssembly.Module(wasmCode);
var wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
console.log(wasmInstance.exports.sum(4,5));
console.log(wasmInstance.exports.mul(4,5));
console.log(wasmInstance.exports.sub(4,5));

//3
wasmImports = {}
wasmCode = fs.readFileSync('./lab.wasm')
wasmModule = new WebAssembly.Module(wasmCode);
wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
console.log(wasmInstance.exports.sum(1,5));
console.log(wasmInstance.exports.mul(2,5));
console.log(wasmInstance.exports.sub(3,5));
//test
wasmImports = {}
wasmCode = fs.readFileSync('./test/a.out.wasm')
wasmModule = new WebAssembly.Module(wasmCode);
wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
console.log(wasmInstance.exports.sum(1,5));
console.log(wasmInstance.exports.mul(2,5));
console.log(wasmInstance.exports.sub(3,5));