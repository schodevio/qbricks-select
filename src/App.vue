<template>
  <div class="py-12 px-4 mx-4 max-w-screen-lg mx-auto">
    <header class="text-center">
      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">qbricks</h2>

      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900">
        Select
      </p>

      <p class="mt-4 text-xl text-gray-500">
        A Select component made with Vue 3.0  &amp; TailwindCSS
      </p>
    </header>

    <section class="flex flex-wrap mt-8">
      <div class="w-full mb-8">
        <q-select
          label="Countries"
          hint="Please select your country"
          :options="countryCodes"
          v-model="countryCode"
        />

        <p class="mt-4">
          Selected country code:
          <strong>{{ countryCode }}</strong>
        </p>
      </div>

      <div class="w-full">
        <q-select
          label="Rows per page"
          :options="pages"
          v-model="pagesNum"
        />

        <p class="mt-4">
          Show
          <strong>{{ pagesNum }}</strong>
          rows per page
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import QSelect from './components/QSelect.vue'

export default {
  name: 'qbrics-select-app',
  components: { QSelect },
  data() {
    return {
      countryCode: '',
      pagesNum: 25,
      countryCodes: [
        {
          text: 'Poland (PL)',
          value: 'PL'
        },
        {
          text: 'Germany (DE)',
          value: 'DE'
        },
        {
          text: 'Czech Republic (CZ)',
          value: 'CZ'
        },
        {
          text: 'Slovakia (SK)',
          value: 'SK'
        },
        {
          text: 'Ukraine (UA)',
          value: 'UA'
        },
        {
          text: 'Belarus (BY)',
          value: 'BY'
        },
        {
          text: 'Lithuania (LT)',
          value: 'LT'
        }
      ],
      pages: [10, 25, 50, 100]
    }
  }
}
</script>
