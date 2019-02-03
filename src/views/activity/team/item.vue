<template>
  <v-card flat>
    <!-- TODO: 修改机会,先咕着 -->
    <v-card-actions>
      <v-spacer/>
      <v-btn color="accent" @click="remove">删除</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'teamItem',
  props: ['id', 'item'],
  methods: {
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/activities/${this.id}/teams/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('remove')
      } catch (e) {
        console.log(e)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
