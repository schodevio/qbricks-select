let awayClickHandler

export default {
  beforeMount(elem, binding) {
    awayClickHandler = event => {
      event.stopPropagation()

      const { handler, exclude } = binding.value
      const vm = binding.instance

      let clickedOnExcludedElem = false

      exclude.forEach(refName => {
        if (!clickedOnExcludedElem) {
          clickedOnExcludedElem = vm.$refs[refName].contains(event.target)
        }
      })

      if (!elem.contains(event.target) && !clickedOnExcludedElem) handler()
    }

    document.addEventListener('click', awayClickHandler)
    document.addEventListener('touchstart', awayClickHandler)
  },
  beforeUnmount() {
    document.removeEventListener('click', awayClickHandler)
    document.removeEventListener('touchstart', awayClickHandler)
  }
}
