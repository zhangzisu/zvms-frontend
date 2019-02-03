<template>
  <v-data-table :headers="headers" :items="items">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.userId }}</td>
        <td>{{ props.item.teamId }}</td>
        <td>{{ props.item.iTime }}</td>
        <td>{{ props.item.oTime }}</td>
        <td>{{ props.item.uTime }}</td>
        <td>{{ props.item.leaderReview }}</td>
        <td>{{ props.item.managerReview }}</td>
        <td>{{ props.item.administratorReview }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{item}">
      <member-item :id="id" :item="item" :updated="load" :no-action="noAction"/>
    </template>
    <template slot="footer" v-if="noAction === undefined">
      <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200">
        <v-btn color="primary" slot="activator" depressed>新建参加者</v-btn>
        <v-card>
          <v-card-text>
            <v-text-field v-model.number="addForm.teamId" label="小队ID" type="number"/>
            <v-text-field v-model.number="addForm.userId" label="用户ID" type="number"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="add">创建</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import Axios from 'axios'
import memberItem from './item.vue'

export default {
  name: 'memberView',
  components: {
    memberItem
  },
  props: ['id', 'items', 'noAction'],
  data: () => ({
    headers: [
      { text: 'MID', value: 'id' },
      { text: 'UID', value: 'userId' },
      { text: 'TID', value: 'teamId' },
      { text: '校内时间', value: 'iTime' },
      { text: '校外时间', value: 'oTime' },
      { text: '通用时间', value: 'uTime' },
      { text: '队长意见', value: 'leaderReview' },
      { text: '学生会意见', value: 'managerReview' },
      { text: '义管会意见', value: 'administratorReview' }
    ],
    addMenu: false,
    addForm: {
      userId: undefined,
      teamId: undefined
    }
  }),
  methods: {
    async add () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/activities/${this.id}/members`, this.addForm)
        if (s !== 0) throw new Error(p)
        await this.load()
        this.$emit('updated')
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/members`)
        if (s !== 0) throw new Error(p)
        this.$emit('update:items', p)
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
