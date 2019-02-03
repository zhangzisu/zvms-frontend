<template>
  <v-data-table :headers="headers" :items="items">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.quota }}</td>
        <td>{{ props.item.isPublic }}</td>
        <td>{{ props.item.groupId }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="{ item }">
      <chance-item :id="id" :item="item" @updated="load"/>
    </template>
    <template slot="footer" v-if="$store.state.profile.isAdministrator">
      <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200">
        <v-btn slot="activator" depressed color="primary">新建分配</v-btn>
        <v-card>
          <v-card-text>
            <v-text-field type="number" label="报名上限" v-model.number="addForm.quota"/>
            <v-checkbox label="公开" v-model="addForm.isPublic"/>
            <v-text-field type="number" label="GID" v-model.number="addForm.groupId"/>
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
import chanceItem from './item.vue'

export default {
  name: 'chanceView',
  components: {
    chanceItem
  },
  props: ['id', 'items'],
  data: () => ({
    headers: [
      { text: 'CID', value: 'id' },
      { text: '剩余人数', value: 'quota' },
      { text: '公开', value: 'isPublic' },
      { text: 'GID', value: 'groupId' }
    ],
    addMenu: false,
    addForm: {
      quota: 0,
      isPublic: false,
      groupId: undefined
    }
  }),
  methods: {
    async add () {
      this.addMenu = false
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/activities/${this.id}/chances`, this.addForm)
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
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/chances`)
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
