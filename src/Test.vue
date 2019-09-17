<template>
  <div>
    <div class="container mt-4 mb-4">
      <div class="row">
        <div class="col-sm-12">
          Test
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import YouTube from '@/lib/youtube'
import Annotate from '@/components/Annotate'
import SimplifyECDICT from '@/lib/simplify-ecdict'

export default {
  components: {
    Annotate
  },
  methods: {
    simplifyECDICT() {
      SimplifyECDICT.simplify()
    }
  },
  mounted() {
    this.simplifyECDICT()
  }
}
</script>
