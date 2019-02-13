<template>
  <v-data-table expand :headers="headers" :items="items" :loading="$store.state.loading">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.leaderId }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{ item }">
      <team-item :id="id" :item="item" :state="state" @updated="load"/>
    </template>
    <template slot="footer" v-if="state === 2">
      <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200">
        <v-btn slot="activator" depressed color="primary">新建小队</v-btn>
        <v-card>
          <v-card-text>
            <v-text-field v-model.number="addForm.leaderId" label="队长UID" type="number"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="primary" @click="add" :loading="$store.state.loading">创建</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../../utils/dialogs'
import teamItem from './item.vue'

export default {
  components: {
    teamItem
  },
  props: ['id', 'items', 'state'],
  data: () => ({
    headers: [
      { text: 'TID', value: 'id' },
      { text: '队长UID', value: 'leaderId' }
    ],
    addMenu: false,
    addForm: {
      leaderId: undefined
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
        const { data: { s, p } } = await Axios.post(`/teams`, this.addForm)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        dialogs.err(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/teams`)
        if (s !== 0) throw new Error(p)
        this.$emit('update:items', p)
      } catch (err) {
        dialogs.err(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
