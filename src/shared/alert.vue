<template>
  <v-alert
  color="warning"
  dismissible
  icon="new_releases"
  @input="onClose"
  :value="true">
    {{text}}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
