<template>
  <v-card flat>
    <v-form>
      <v-card-text>
        <v-text-field v-model.number="form.iTime" type="number" label="内部时间"/>
        <v-text-field v-model.number="form.oTime" type="number" label="外部时间"/>
        <v-text-field v-model.number="form.uTime" type="number" label="万能时间"/>
        <v-textarea v-model="form.comment" label="评论" placeholder="留空为不变"/>
        <v-checkbox v-model="form.isLeaderApproved" label="队长批准"></v-checkbox>
        <v-checkbox v-model="form.isManagerApproved" label="实践部批准"></v-checkbox>
        <v-checkbox v-model="form.isAdminApproved" label="义管会批准"></v-checkbox>
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" depressed @click="apply" :loading="$store.state.loading">应用</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../utils/dialogs'

export default {
  props: ['id', 'tid'],
  data: () => ({
    form: {
      iTime: 0,
      oTime: 0,
      uTime: 0,
      comment: undefined,
      isLeaderApproved: false,
      isManagerApproved: false,
      isAdminApproved: false
    }
  }),
  methods: {
    async apply () {
      let updateUrl = this.tid ? `/teams/${this.tid}/members` : `/activities/${this.id}/members`
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.put(updateUrl, this.form)
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
</script>
