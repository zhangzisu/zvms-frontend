<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">创建义工活动</v-card-title>
            <v-card-text>
              <v-text-field label="名称" v-model="name" :rules="rules"/>
              <v-textarea label="描述" v-model="description" :rules="rules"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                @click="submit"
                :loading="$store.state.loading"
                :disabled="!valid"
                color="primary"
              >提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../utils/dialogs'
import { V_NOT_EMPTY } from '../../utils/validation'

export default {
  data: () => ({
    name: undefined,
    description: undefined,
    valid: false,
    rules: [V_NOT_EMPTY()]
  }),
  methods: {
    async submit () {
      this.$store.commit('loading', true)
      const form = {
        name: this.name,
        description: this.description,
        // 需要重构以支持管理员指定添加
        ownerId: this.$store.state.profile.id
      }
      try {
        const {
          data: { s, p }
        } = await Axios.post('/activities', form)
        if (s !== 0) throw new Error(p)
        this.$router.push(`/activities/show/${p}`)
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
