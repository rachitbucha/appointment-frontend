<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
</script>

<template>
  <h1 class="welcome-heading">Welcome</h1>
  <div class="center-box">
    <div class="grid gap-8 md:grid-cols-2">
      <RouterLink to="booking">
        <EventCard
          iconClass="pi pi-calendar-plus"
          title="Book Event"
          description="Easily schedule and manage your events."
        />
      </RouterLink>
      <RouterLink to="events">
        <EventCard
          iconClass="pi pi-address-book"
          title="Show Events"
          description="View and explore your scheduled events."
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
}

.grid {
  display: grid;
  gap: 16px;
}

.welcome-heading {
  display: flex;
  justify-content: center;
  top: 20vh;
  position: fixed;
  left: 45%;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
