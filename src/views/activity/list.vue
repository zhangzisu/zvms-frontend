<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline">义工列表</div>
            <v-spacer/>
            <v-text-field placeholder="输入搜索内容，留空显示全部" append-icon="search" single-line @click:append="load" @keyup.native.enter="load" v-model="search"/>
          </v-card-title>
          <v-data-table expand :rows-per-page-items="[5, 10, 15, 25, 50]" :headers="headers" :items="items" :pagination.sync="pagination" :loading="$store.state.loading">
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.state }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-container fluid grid-list-md class="grey lighten-3">
                <v-layout row>
                  <v-flex xs3>
                    <v-card class="fill-height">
                      <v-card-text
                        class="display-3 font-weight-thin text-xs-center"
                      >#{{ props.item.id }}</v-card-text>
                      <v-card-text>
                        <v-chip>{{ status[props.item.state] }}</v-chip>
                        <v-chip>{{ props.item.isComputed ? '已生效' : '未生效' }}</v-chip>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs9>
                    <v-card class="fill-height">
                      <v-card-title class="headline">{{ props.item.name }}</v-card-title>
                      <v-card-text>
                        <pre>{{ props.item.description }}</pre>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" :to="`/activities/show/${props.item.id}`">更多</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </template>
            <template slot="footer" v-if="$store.state.profile.isProvider">
              <td :colspan="headers.length">
                <v-btn flat to="/activities/create">新建</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../utils/dialogs'

export default {
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: '名称', value: 'name' },
      { text: '状态', value: 'state' }
    ],
    items: [],
    status: [
      '等待审核',
      '审核通过',
      '报名中',
      '等待核查',
      '完成'
    ],
    pagination: {
      descending: undefined,
      page: 1,
      rowsPerPage: 15,
      sortBy: undefined,
      totalItems: 0
    },
    search: undefined
  }),
  watch: {
    pagination: {
      handler () {
        this.load()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async load () {
      this.$store.commit('loading', true)
      try {
        const {
          data: { s, p }
        } = await Axios.get('/activities', { params: Object.assign({ search: this.search }, this.pagination) })
        if (s !== 0) throw new Error(p);
        [this.items, this.pagination.totalItems] = p
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
