/* eslint-disable no-prototype-builtins */
export abstract class Base {
  protected services: unknown

  protected constructor() {
    this.services = {}
  }

  protected service(name: PropertyKey, cb: (param: any) => any): Base {
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
