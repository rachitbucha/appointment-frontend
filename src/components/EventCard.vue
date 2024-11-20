<template>
  <div class="card">
    <div class="header mb-4">
      <slot name="header">
        <i :class="iconClass"></i>
      </slot>
    </div>
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <p class="text-gray-500">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.card {
  width: 280px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card i {
  font-size: 3rem;
  color: #3b82f6;
  transition: color 0.3s;
}

.card:hover i {
  color: #1d4ed8;
}
</style>
