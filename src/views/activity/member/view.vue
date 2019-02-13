<template>
  <v-data-table expand :headers="headers" :items="items" :loading="$store.state.loading">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.userId }}</td>
        <td>{{ props.item.teamId }}</td>
        <td>{{ props.item.iTime }}</td>
        <td>{{ props.item.oTime }}</td>
        <td>{{ props.item.uTime }}</td>
        <td>{{ props.item.isLeaderApproved }}</td>
        <td>{{ props.item.isManagerApproved }}</td>
        <td>{{ props.item.isAdminApproved }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{item}">
      <member-item :id="id" :item="item" :updated="load" :state="state" :no-action="noAction"/>
    </template>
    <template slot="footer" v-if="state === 2 && noAction === undefined">
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
import dialogs from '../../../utils/dialogs'
import memberItem from './item.vue'

export default {
  components: {
    memberItem
  },
  props: ['id', 'items', 'noAction', 'state'],
  data: () => ({
    headers: [
      { text: 'MID', value: 'id' },
      { text: 'UID', value: 'userId' },
      { text: 'TID', value: 'teamId' },
      { text: '校内时间', value: 'iTime' },
      { text: '校外时间', value: 'oTime' },
      { text: '通用时间', value: 'uTime' },
      { text: '队长批准', value: 'isLeaderApproved' },
      { text: '实践部批准', value: 'isManagerApproved' },
      { text: '义管会批准', value: 'isAdminApproved' }
    ],
    addMenu: false,
    addForm: {
      userId: undefined,
      teamId: undefined
    }
  }),
  watch: {
    id: {
      immediate: true,
      handler () {
        this.addForm.activityId = this.id
      }
    }
  },
  methods: {
    async add () {
      this.addMenu = false
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/members`, this.addForm)
        if (s !== 0) throw new Error(p)
        await this.load()
        this.$emit('updated')
      } catch (err) {
        dialogs.toasts.error(err)
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
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
