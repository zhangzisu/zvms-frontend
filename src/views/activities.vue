<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card>
            <v-data-table :headers="headers" :items="items">
              <template slot="footer" v-if="$store.state.profile.isProvider">
                <td :colspan="headers.length">
                  <v-btn flat>新建</v-btn>
                </td>
              </template>
            </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'activities',
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: '名称', value: 'name' },
      { text: '状态', value: 'state' }
    ],
    items: []
  })
}
</script>
