<template>
  <v-card class="grey lighten-3" flat>
    <!-- TODO: 修改机会,先咕着 -->
    <v-card-actions v-if="state === 1 && $store.state.profile.isAdmin">
      <v-spacer/>
      <v-btn color="accent" @click="remove" :loading="$store.state.loading">删除</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../../utils/dialogs'

export default {
  props: ['id', 'item', 'state'],
  methods: {
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/chances/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
