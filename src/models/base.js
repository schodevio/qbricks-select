import defaultsDeep from 'lodash/defaultsDeep'
import get from 'lodash/get'
import set from 'lodash/set'

export class Model {
  constructor(attributes = {}) {
    defaultsDeep(this, attributes, this.defaults)
  }

  assign(attributes) {
    return Object.assign(this, defaultsDeep({}, attributes, this))
  }

  get(attribute) {
    return get(this, attribute)
  }

  set(attribute, value) {
    set(this, attribute, value)
  }
}

export class List {
  constructor(items = []) {
    this.models = items.map(item => new (this.model)(item))
  }

  get length() {
    return this.models.length
  }

  get first() {
    return this.models[0]
  }

  get last() {
    return this.models[this.length - 1]
  }
}
