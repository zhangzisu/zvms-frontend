<template>
  <v-data-table :headers="headers" :items="items">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.leaderId }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{ item }">
      <team-item :id="id" :item="item" @remove="load"/>
    </template>
    <template slot="footer">
      <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200">
        <v-btn slot="activator" depressed color="primary">新建小队</v-btn>
        <v-card>
          <v-card-text>
            <v-text-field v-model.number="addForm.leaderId" label="队长UID" type="number"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="primary" @click="add">创建</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import Axios from 'axios'
import teamItem from './item.vue'

export default {
  name: 'teamView',
  components: {
    teamItem
  },
  props: ['id', 'items'],
  data: () => ({
    headers: [
      { text: 'TID', valus: 'id' },
      { text: '队长UID', valus: 'leaderId' }
    ],
    addMenu: false,
    addForm: {
      leaderId: undefined
    }
  }),
  methods: {
    async add () {
      this.addMenu = false
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/activities/${this.id}/teams`, this.addForm)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        console.log(err)
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
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
