{
  const name = Symbol("name")
  const age = Symbol("age")
  const globalName = Symbol.for("globalName")
  console.log('name', name)
  console.log('age', age)
  console.log('globalName', globalName)
  const tmp = {}
  Object.defineProperty(tmp, name, { value: "NAME" })

  const phone = {}
  Object.defineProperties(phone, {
    [Symbol("memory")]: { value: "8G" },
    [Symbol("aspect-ratio")]: { value: "16/9" },
    [Symbol("brand")]: { value: "XIAOMI" },
    [Symbol("screen")]: { value: "SCREEN" }
  })
  console.log('phone', Object.getOwnPropertyDescriptors(phone))
  const refKey = Reflect.ownKeys(phone)
  console.log('refKey', refKey)
}
{
  class AsyncIterator {
    private start: number
    private end: number
    constructor() {
      this.start = 0;
      this.end = 20;
    }
    async *[Symbol.asyncIterator]() {
      while (this.start < this.end) {
        console.log(this.start)
        yield new Promise((resolve) => resolve(this.start++))
      }
    }
  }
  const instance = new AsyncIterator()
  console.log('instance', instance)
  const run = async () => {
    for await (const v of instance) { }
  }
  run()
}