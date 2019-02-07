<template>
  <v-data-table :items="items" :headers="headers" expand>
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.activityId }}</td>
        <td>{{ props.item.userId }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.mimeType }}</td>
        <td>
          <v-btn icon @click="remove(props.item.id)">
            <v-icon small>delete</v-icon>
          </v-btn>
          <v-btn icon :href="`/api/medias/${props.item.id}`" :download="props.item.name">
            <v-icon small>cloud_download</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{ item }">
      <v-card flat class="grey lighten-3">
        <v-container justify-center fluid>
          <v-layout justify-center fill-height>
            <v-img :src="`/api/medias/${item.id}`"/>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
import Axios from 'axios'
import dialogs from '../utils/dialogs'

export default {
  name: 'gallery',
  props: ['items'],
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: '活动ID', value: 'activityId' },
      { text: '用户ID', value: 'userId' },
      { text: '文件名', value: 'name' },
      { text: 'Mime类型', value: 'mimeType' },
      { text: '操作', sortable: false }
    ]
  }),
  methods: {
    async remove (id) {
      if (await dialogs.confirm('该操作无法撤销！数据将永久丢失！')) {
        this.$store.commit('loading', true)
        try {
          const { data: { s, p } } = await Axios.delete(`/medias/${id}`)
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
}
</script>
