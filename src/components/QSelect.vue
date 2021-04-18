<template>
  <div class="mt-1 relative">
    <input type="hidden" :value="modelValue" />

    <label
      :for="$attrs.id"
      class="block mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <button
      ref="activator"
      v-bind="$attrs"
      class="
        relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default
        focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
      "
      @click="toggleDropdown"
      aria-label="Select Activator"
    >
      <span class="flex items-center">
        <span class="h-5 ml-2 block truncate">
          {{ selectedOptionLabel }}
        </span>
      </span>

      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          :class="['h-5 w-5 text-gray-400 transform', { 'rotate-180': open }]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>

    <div
      class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
      v-show="open"
      v-click-away="{
        exclude: ['activator'],
        handler: closeDropdown
      }"
    >
      <ul
        tabindex="-1"
        class="
          max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-y-auto focus:outline-none
          sm:text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scrollbar-thumb-rounded
        "
      >
        <li
          v-for="option in localOptions.models"
          :key="option.value"
          role="option"
          :class="[
            'text-gray-900 hover:bg-indigo-500 hover:text-white cursor-default select-none relative py-2 px-3',
            { 'bg-indigo-500': option.value == modelValue }
          ]"
          @click="selectOption(option.value)"
        >
          <div :class="['flex items-center', { 'text-white': option.value == modelValue }]">
            <span class="ml-3 block font-normal truncate">
              {{ option.text || option.value }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="!!hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import { OptionsList } from '../models/option'

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    hint: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },
  setup(props, { emit }) {
    // Open
    const open = ref(false)

    const toggleDropdown = () => open.value = !open.value
    const closeDropdown = () => open.value = false

    // Options
    const localOptions = ref(new OptionsList(props.options))

    const selectOption = value => {
      closeDropdown(); emit('update:modelValue', value)
    }

    const selectedOption = computed(() => (
      localOptions.value.models.find(option => option.value == props.modelValue)
    ))

    const selectedOptionLabel = computed(() => (
      selectedOption.value?.label || props.modelValue
    ))

    return {
      open,
      toggleDropdown,
      closeDropdown,

      localOptions,
      selectOption,
      selectedOptionLabel
    }
  }
}
</script>
