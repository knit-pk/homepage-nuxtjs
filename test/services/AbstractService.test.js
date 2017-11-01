import test from 'ava'
import AbstractService from '../../services/AbstractService.js'

let AbstractServiceInstance

test.before('init AbstractServiceInstance', t => {
  AbstractServiceInstance = new AbstractService({ http: { get (string) { console.log(string) } } })
})

test('AbstractService should be function', t => {
  t.is(typeof AbstractService, 'function')
})

test('AbstractServiceInstance should be object', t => {
  t.is(typeof AbstractServiceInstance, 'object')
})

test('AbstractServiceInstance#paramCompose should return only path if param is empty string', t => {
  t.is(AbstractServiceInstance.paramCompose('/path', ''), '/path')
})

test('AbstractServiceInstance#paramCompose should return path with param if possible', t => {
  t.is(AbstractServiceInstance.paramCompose('/path', 'param'), '/path/param')
})

test('AbstractServiceInstance#qsCompose should return path if qs is empty string', t => {
  t.is(AbstractServiceInstance.qsCompose('/path', ''), '/path')
})

test('AbstractServiceInstance#qsCompose should return path with query if possible', t => {
  t.is(AbstractServiceInstance.qsCompose('/path', 'key=val'), '/path?key=val')
})

test('AbstractServiceInstance#qsFromQsPair should return qs1 if qs2 is empty string', t => {
  t.is(AbstractServiceInstance.qsFromQsPair('qs1', ''), 'qs1')
})

test('AbstractServiceInstance#qsFromQsPair should return qs2 if qs1 is empty string', t => {
  t.is(AbstractServiceInstance.qsFromQsPair('', 'qs2'), 'qs2')
})

test('AbstractServiceInstance#qsFromQsPair should return correct qs from both qs', t => {
  t.is(AbstractServiceInstance.qsFromQsPair('qs1', 'qs2'), 'qs1&qs2')
})

test('AbstractServiceInstance#qsFromKVPair should return empty string if either key or val is empty string (val)', t => {
  t.is(AbstractServiceInstance.qsFromKVPair('key', ''), '')
})

test('AbstractServiceInstance#qsFromKVPair should return qs if both args are defined', t => {
  t.is(AbstractServiceInstance.qsFromKVPair('key', 'val'), 'key=val')
})

test('AbstractServiceInstance#qsFromKVPair should return qs if both args are defined', t => {
  t.is(AbstractServiceInstance.qsFromKVPair('key', 'val'), 'key=val')
})

test('AbstractServiceInstance#qsFromArray should return empty string if called with no args', t => {
  t.is(AbstractServiceInstance.qsFromArray(), '')
})

test('AbstractServiceInstance#qsFromArray should return qs from array', t => {
  t.is(AbstractServiceInstance.qsFromArray([1, 'someVal'], 'prop'), 'prop=1&prop=someVal')
})

test('AbstractServiceInstance#qsFromObject should return qs from object (array first)', t => {
  const controlRet = 'prop2=1&prop2=2&prop2=3&prop1=val&prop3=val'
  t.is(AbstractServiceInstance.qsFromObject({ prop2: [1, 2, 3], prop1: 'val', prop3: 'val' }), controlRet)
})

test('AbstractServiceInstance#qsFromObject should return qs from object (array second)', t => {
  const controlRet = 'prop1=val&prop2=1&prop2=2&prop2=3&prop3=val'
  t.is(AbstractServiceInstance.qsFromObject({ prop1: 'val', prop2: [1, 2, 3], prop3: 'val' }), controlRet)
})

test('AbstractServiceInstance#qsFromObject should return qs from object (array last)', t => {
  const controlRet = 'prop1=val&prop3=val&prop2=1&prop2=2&prop2=3'
  t.is(AbstractServiceInstance.qsFromObject({ prop1: 'val', prop3: 'val', prop2: [1, 2, 3] }), controlRet)
})

test('AbstractServiceInstance#qsConcat should return empty string if called with no args', t => {
  const controlRet = ''
  t.is(AbstractServiceInstance.qsConcat(), controlRet)
})

test('AbstractServiceInstance#qsConcat should return non empty string if one arg is non empty strin(first)', t => {
  const controlRet = 'bcd=2'
  t.is(AbstractServiceInstance.qsConcat('bcd=2', ''), controlRet)
})

test('AbstractServiceInstance#qsConcat should return non empty string if one arg is non empty string (second)', t => {
  const controlRet = 'bcd=2'
  t.is(AbstractServiceInstance.qsConcat('', 'bcd=2'), controlRet)
})

test('AbstractServiceInstance#qsConcat should return concated 2 queryStrings', t => {
  const controlRet = 'abc=1&bcd=2'
  t.is(AbstractServiceInstance.qsConcat('abc=1', 'bcd=2'), controlRet)
})

test('AbstractServiceInstance#qsConcat should return concated multiple queryStrings', t => {
  const controlRet = 'abc=1&bcd=2&cdf=6'
  t.is(AbstractServiceInstance.qsConcat('abc=1', 'bcd=2', 'cdf=6', ''), controlRet)
})
