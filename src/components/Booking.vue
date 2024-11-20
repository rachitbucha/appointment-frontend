<template>
  <div id="app" class="container">
    <RouterLink to="/"> <i class="pi pi-angle-double-left"> Back </i></RouterLink>
    <div class="grid">
      <UserCard :selectedDateText="selectedDate" />
      <DateSelector @select-date="updateSelectedDate" @time-zone-change="onTimeZoneChange" />
      <SlotSection
        :timeSlots="timeSlots"
        :selectedDate="selectedDate"
        :timezone="timezone"
        @select-time="onSelectTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type ComputedRef, type Ref } from 'vue'
import UserCard from './UserCard.vue'
import DateSelector from './DateSelector.vue'
import { getFreeSlots } from '@/api/appointment'
import { formatTo12HourTime } from '@/utils/date-utils'
import SlotSection from './SlotSection.vue'
import moment from 'moment-timezone'

const selectedDate: Ref = ref()
const timeSlots = ref([])
const timezone: Ref = ref('Asia/Calcutta')

const updateSelectedDate = (date: ComputedRef) => {
  selectedDate.value = date
  fetchSlots(date)
}


const fetchSlots = async (date?: ComputedRef | null) => {
  try {
    const localDate = new Date(date?.value || new Date());

    const timestampInTimezone = moment(localDate).tz(timezone.value).valueOf();

    const response = await getFreeSlots(timestampInTimezone, timezone.value);

    timeSlots.value = response.data.map((slot: string) => formatTo12HourTime(slot, timezone.value));
  } catch (error) {
    console.error('Failed to load time slots:', error);
  }
};


const onSelectTime = (slot: string) => {
  timeSlots.value = timeSlots.value.filter((time) => time !== slot)
}

const onTimeZoneChange = (tz: string) => {
  timezone.value = tz
  fetchSlots(selectedDate.value)
}
</script>
