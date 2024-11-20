<template>
  <div class="times">
    <div
      v-for="time in timeSlots"
      :key="time"
      class="time-item"
      :class="{ selected: selectedTime === time }"
    >
      <span class="time-text" @click="setTime(time)">{{ time }}</span>
      <button class="select-button" v-if="selectedTime === time" @click="selectTime(time)">
        Select
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createEvent } from '@/api/appointment'
import moment from 'moment-timezone';
import { ref, type PropType, type Ref } from 'vue'

const props = defineProps({
  timeSlots: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selectedDate: {
    type: Object as PropType<Ref<Date | null>>,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['select-time'])

const selectedTime = ref('')

const setTime = (time: string) => {
  selectedTime.value = time
}

const selectTime = async (time: string) => {
  try {
    if (!props.selectedDate.value) {
      alert('Please select a date first.')
      return
    }

    const [hourPart, minutePart] = time.split(':')
    const minutes = parseInt(minutePart.slice(0, 2), 10)
    const period = minutePart.slice(-2).toUpperCase()
    let hours = parseInt(hourPart, 10)

    if (period === 'PM' && hours < 12) {
      hours += 12
    } else if (period === 'AM' && hours === 12) {
      hours = 0
    }

    const combinedDate = new Date(props.selectedDate.value)
    combinedDate.setHours(hours, minutes, 0, 0)

    const timezone = props.timezone 
    const localizedDate = moment(combinedDate).tz(timezone, true).format()

    const timestamp = new Date(localizedDate).getTime();

    console.log(`Selected Timezone: ${timezone}, Timestamp: ${timestamp}`)

    await createEvent(timestamp, timezone, 30)

    emit('select-time', time)
  } catch (error) {
    alert(error?.response?.data?.message || 'Unable to process, Please try again...')
  }
}
</script>

<style scoped>
.times {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  max-height: 600px;
  align-self: center;
}

.times .time-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #6b46c1;
  color: #6b46c1;
  padding: 8px;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.times .time-item:hover {
  background-color: #6b46c1;
  color: #ffffff;
}

.times .time-item.selected {
  background-color: #6b46c1;
  color: #ffffff;
}

.times .time-item .select-button {
  background-color: #6b46c1;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.times .time-item .select-button:hover {
  background-color: #553c9a;
}

.times .time-item .time-text {
  flex-grow: 1;
  text-align: center;
}
</style>
