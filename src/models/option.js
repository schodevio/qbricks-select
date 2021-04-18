import { Model, List } from './base'

class Option extends Model {
  get defaults() {
    return {
      text: '',
      value: ''
    }
  }

  get label() {
    return this.text || this.value
  }
}

class OptionsList extends List {
  constructor(items = []) {
    super()

    this.models = items.map(item => {
      switch(typeof item) {
        case 'object':
          return new (this.model)(item)
        case 'string':
        case 'number':
          return new (this.model)({ value: item })
        default:
          return new (this.model)()
      }
    })
  }

  get model() {
    return Option
  }
}

export { Option, OptionsList }
