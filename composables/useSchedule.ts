// composables/useSchedule.ts
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'frontendnow_schedule_ids'

// Modulweiter Singleton-State für reaktive Synchronisation über alle Komponenten hinweg
const savedSessionIds = ref<string[]>([])
const isInitialized = ref(false)

export const useSchedule = () => {
  // Rehydration: Liest gespeicherte IDs sicher im Client aus localStorage
  const initSchedule = () => {
    if (import.meta.client && !isInitialized.value) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          savedSessionIds.value = JSON.parse(stored)
        }
      } catch (err) {
        console.error('Fehler beim Einlesen von localStorage:', err)
        savedSessionIds.value = []
      } finally {
        isInitialized.value = true
      }
    }
  }

  // Automatischer Rehydration-Trigger im Client
  if (import.meta.client && !isInitialized.value) {
    onMounted(() => {
      initSchedule()
    })
  }

  // Synchronisation in localStorage
  const persist = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSessionIds.value))
      } catch (err) {
        console.error('Fehler beim Schreiben in localStorage:', err)
      }
    }
  }

  // Prüft, ob eine Session aktuell im Programm ist
  const isBookmarked = (id: string): boolean => {
    return savedSessionIds.value.includes(id)
  }

  // Hinzufügen / Entfernen (Toggle)
  const toggleBookmark = (id: string) => {
    if (isBookmarked(id)) {
      savedSessionIds.value = savedSessionIds.value.filter(itemId => itemId !== id)
    } else {
      savedSessionIds.value = [...savedSessionIds.value, id]
    }
    persist()
  }

  return {
    savedSessionIds: computed(() => savedSessionIds.value),
    isBookmarked,
    toggleBookmark,
    bookmarkCount: computed(() => savedSessionIds.value.length),
    initSchedule
  }
}