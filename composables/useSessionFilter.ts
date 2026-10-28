// composables/useSessionFilter.ts
import { ref, computed, type Ref } from "vue";
import type { Session } from "../types/conference";

export const useSessionFilter = (sessions: Ref<Session[]>) => {
  const selectedTrack = ref<string>("");
  const selectedDay = ref<string>("");
  const selectedLevel = ref<string>("");
  const searchQuery = ref<string>("");

  // Berechnete Liste aller gefilterten Sessions (UND-Verknüpfung)
  const filteredSessions = computed<Session[]>(() => {
    return sessions.value.filter((session) => {
      // 1. Filter nach Track
      const matchesTrack =
        !selectedTrack.value || session.trackId === selectedTrack.value;

      // 2. Filter nach Konferenztag (UND)
      const matchesDay =
        !selectedDay.value || session.day === selectedDay.value;

      // 3. Filter nach Level (UND)
      const matchesLevel =
        !selectedLevel.value || session.level === selectedLevel.value;

      // 4. Textsuche im Titel oder Abstract
      const matchesSearch =
        !searchQuery.value.trim() ||
        session.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        session.abstract
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());

      return matchesTrack && matchesDay && matchesLevel && matchesSearch;
    });
  });

  const hasActiveFilters = computed<boolean>(() => {
    return !!(
      selectedTrack.value ||
      selectedDay.value ||
      selectedLevel.value ||
      searchQuery.value.trim()
    );
  });

  const resetFilters = () => {
    selectedTrack.value = "";
    selectedDay.value = "";
    selectedLevel.value = "";
    searchQuery.value = "";
  };

  return {
    selectedTrack,
    selectedDay,
    selectedLevel,
    searchQuery,
    filteredSessions,
    hasActiveFilters,
    resetFilters,
  };
};
