(function () {
  const objPrototype = Object.prototype
  const hasOwnProperty = objPrototype.hasOwnProperty
  const toString = objPrototype.toString
  const getType = (value) => {
    return toString.call(value).split(' ')[1].replace(']', '')
  }
  const classNames = (...args) => {
    let classArr = []
    args.forEach(arg => {
      if (!arg) {
        return
      }
      const argType = getType(arg)
      switch (argType) {
        case 'String':
        case 'Number':
          classArr.push(arg)
          break
        case 'Object':
          Object.keys(arg).forEach(key => arg[key] && classArr.push(key))
          break
        case 'Array':
          const inner = classNames.call(null, ...arg)
          if (inner) {
            classArr.push(inner)
          }
      }
    })
    return classArr.join(' ')
  }
  return classNames
})(this)