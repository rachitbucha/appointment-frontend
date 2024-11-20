import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export const getFreeSlots = async (timestamp: Number, timezone: String) => {
  try {
    const response = await axios.get(`${BASE_URL}/appointment/free-slots`, {
      params: { timestamp, timezone },
    })
    return response?.data || []
  } catch (error) {
    console.error('Error fetching free slots:', error)
    throw error
  }
}

export const createEvent = async (timestamp: Number, timezone: String, duration: Number) => {
  try {
    const response = await axios.post(`${BASE_URL}/appointment/create-event`, null, {
      params: {
        timestamp,
        timezone,
        duration,
      },
    })
    return response
  } catch (error) {
    console.error('Error creating appointment:', error)
    throw error
  }
}
