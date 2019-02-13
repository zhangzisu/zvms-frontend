<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline">用户列表</div>
            <v-spacer/>
            <v-text-field placeholder="输入搜索内容，留空显示全部" append-icon="search" single-line @click:append="load" @keyup.native.enter="load" v-model="search"/>
          </v-card-title>
          <v-data-table expand :rows-per-page-items="[5, 10, 15, 25, 50]" :headers="headers" :items="items" :pagination.sync="pagination" :loading="$store.state.loading" :total-items="totalItems">
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.iTime }}</td>
                <td>{{ props.item.oTime }}</td>
                <td>{{ props.item.uTime }}</td>
                <td>{{ Math.min(props.item.iTime, 20) + Math.min(props.item.oTime, 20) + props.item.uTime >= 40 }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="{ item }">
              <userinfo :info="item"/>
            </template>
            <template slot="footer" v-if="$store.state.profile.isAdmin">
              <v-btn color="primary" depressed to="/users/create">新建用户</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userinfo from '../../components/userinfo.vue'
import Axios from 'axios'
import dialogs from '../../utils/dialogs'

export default {
  components: {
    userinfo
  },
  data: () => ({
    headers: [
      { text: 'UID', value: 'id' },
      { text: '用户名', value: 'name' },
      { text: '校内时间', value: 'iTime' },
      { text: '校外时间', value: 'oTime' },
      { text: '通用时间', value: 'uTime' },
      { text: '达标', sortable: false }
    ],
    items: [],
    pagination: {
      descending: undefined,
      page: 1,
      rowsPerPage: 15,
      sortBy: undefined,
      totalItems: 0
    },
    search: undefined,
    totalItems: 0
  }),
  watch: {
    pagination: {
      handler () {
        this.$store.state.loading || this.load()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/users`, { params: Object.assign({ search: this.search }, this.pagination) })
        if (s !== 0) throw new Error(p);
        [this.items, this.totalItems] = p
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$nextTick(() => this.$store.commit('loading', false))
      }
    }
  }
}
</script>
