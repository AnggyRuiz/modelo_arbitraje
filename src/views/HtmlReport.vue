<template>
  <div>
      {{htmlPdf}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['htmlPdf'])
    }

}
</script>

<style>

</style>