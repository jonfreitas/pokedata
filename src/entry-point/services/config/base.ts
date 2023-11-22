/* eslint-disable no-prototype-builtins */
export abstract class Base {
  protected services: unknown

  constructor() {
    this.services = {}
  }

  protected service(name: PropertyKey, cb: (param) => any): Base {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this.services.hasOwnProperty(name)) {
          this.services[name] = cb(this)
        }

        return this.services[name]
      },
      configurable: true,
      enumerable: true,
    })

    return this
  }
}
