<template>
  <div>
    <h2 class="subheader">Select Date & Time</h2>
    <div class="month-year-selector">
      <i class="pi pi-chevron-left" @click="prevMonth"></i>
      <span class="font-semibold mx-4">{{ monthName }} {{ year }}</span>
      <i class="pi pi-chevron-right active" @click="nextMonth"></i>
    </div>
    <div class="calendar">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div v-for="blank in firstDayOfMonth" :key="blank"></div>
      <div
        v-for="date in daysInMonth"
        :key="date"
        @click="selectDate(date)"
        :class="{ selected: isSelectedDate(date), disabled: isDisabledDate(date) }"
      >
        {{ date }}
      </div>
    </div>
    <div class="timezone">
      <h3 class="subheader">Time zone</h3>
      <div class="flex items-center">
        <i class="pi pi-globe"></i>
        <select v-model="selectedTimezone" @change="onTimezoneChange">
          <option v-for="timezone in timezones" :key="timezone.value" :value="timezone.value">
            {{ timezone.key }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const timezones = ref([
  { key: 'GMT+05:30 Asia/Calcutta (IST)', value: 'Asia/Calcutta' },
  { key: 'GMT-08:00 America/Los_Angeles (PST)', value: 'America/Los_Angeles' },
  { key: 'GMT-05:00 America/New_York (EST)', value: 'America/New_York' },
  { key: 'GMT+00:00 Europe/London (GMT)', value: 'Europe/London' },
  { key: 'GMT+01:00 Europe/Paris (CET)', value: 'Europe/Paris' },
  { key: 'GMT+02:00 Africa/Cairo (EET)', value: 'Africa/Cairo' },
  { key: 'GMT+08:00 Asia/Singapore (SGT)', value: 'Asia/Singapore' },
  { key: 'GMT+09:00 Asia/Tokyo (JST)', value: 'Asia/Tokyo' },
  { key: 'GMT+10:00 Australia/Sydney (AEST)', value: 'Australia/Sydney' },
  { key: 'GMT+13:00 Pacific/Auckland (NZDT)', value: 'Pacific/Auckland' },
])

const selectedTimezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

const emit = defineEmits(['select-date', 'time-zone-change'])

const date = new Date()
const year = ref(date.getFullYear())
const month = ref(date.getMonth())
const selectedDate = ref()

const firstDayOfMonth = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

const selectedDateText = computed(() => {
  if (selectedDate.value) {
    return `${monthName.value} ${selectedDate.value}, ${year.value}`
  }
  return 'Select a date'
})

const selectDate = (date: number) => {
  if (!isDisabledDate(date)) {
    selectedDate.value = date
    emit('select-date', selectedDateText)
  }
}

const isSelectedDate = (date: number) => {
  return selectedDate.value === date
}

const isDisabledDate = (date: number) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDate = today.getDate()
  return (
    year.value < currentYear ||
    (year.value === currentYear && month.value < currentMonth) ||
    (year.value === currentYear && month.value === currentMonth && date < currentDate)
  )
}

const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}

const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

const monthName = computed(() => {
  return new Date(year.value, month.value).toLocaleString('default', { month: 'long' })
})

const daysInMonth = computed(() => {
  return Array.from({ length: new Date(year.value, month.value + 1, 0).getDate() }, (_, i) => i + 1)
})

const onTimezoneChange = () => {
  console.log(selectedTimezone)
  emit('time-zone-change', selectedTimezone.value)
}
</script>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
  margin-bottom: 16px;
}

.calendar div {
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition:
    background-color 0.3s,
    color 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar .selected {
  background-color: #6b46c1;
  color: #ffffff;
}

.calendar .disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.calendar div:hover:not(.disabled) {
  background-color: #e2e8f0;
}

.month-year-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.month-year-selector i {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.month-year-selector i:hover {
  background-color: #e2e8f0;
}

.month-year-selector .active {
  background-color: #6b46c1;
  color: #ffffff;
}

.month-year-selector span {
  margin: 0 16px;
  font-weight: 600;
  position: relative;
}

.month-year-selector span::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f3f4f6;
  z-index: -1;
}

.timezone {
  margin-bottom: 16px;
}

.timezone select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}
</style>
