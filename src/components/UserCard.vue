<template>
  <div>
    <h2 class="header">Dr. John</h2>
    <div class="flex">
      <i class="pi pi-clock"></i>
      <span>30 Mins (US/Eastern)</span>
    </div>
    <div class="flex">
      <i class="pi pi-calendar"></i>
      <span>{{ selectedDateText || 'No date selected' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  selectedDateText: {
    type: [String, Number],
    default: null,
  },
})
</script>

<style scoped>
.header {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.subheader {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
</style>
