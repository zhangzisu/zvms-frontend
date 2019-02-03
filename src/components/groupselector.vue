<template>
  <v-autocomplete
    :loading="$store.state.loading"
    :items="items"
    :search-input.sync="search"
    v-model="group"
    cache-items
    flat
    :item-text="item => `#${item.id}.${item.name}`"
    item-value="id"
    label="输入组名/ID"
  >
    <template slot="item" slot-scope="{ item }">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>#{{ item.id }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-autocomplete>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'groupSelector',
  props: ['value'],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  data () {
    return {
      items: [],
      search: undefined,
      group: undefined
    }
  },
  watch: {
    group: {
      handler () {
        this.$emit('update:value', this.group)
      }
    },
    'search': {
      immediate: true,
      handler () {
        this.fetch()
      }
    }
  },
  methods: {
    async fetch () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get('/groups/s', { params: { q: this.search } })
        if (s !== 0) throw new Error(p)
        this.items = p
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
