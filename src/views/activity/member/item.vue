<template>
  <v-card class="grey lighten-3" flat>
    <v-card-text>
      <pre>{{ item.comment }}</pre>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="load" :loading="$store.state.loading" :disabled="!!extra" depressed>加载信息</v-btn>
      <v-btn color="accent" @click="remove" depressed v-if="noAction === undefined">删除</v-btn>
    </v-card-actions>
    <v-card-text v-if="!!extra">
      <user-info :info="extra.user"/>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
import userInfo from '../../../components/userinfo.vue'

export default {
  name: 'memberItem',
  components: {
    userInfo
  },
  props: ['id', 'item', 'noAction'],
  data: () => ({
    extra: undefined
  }),
  methods: {
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.extra = p
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/activities/${this.id}/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
