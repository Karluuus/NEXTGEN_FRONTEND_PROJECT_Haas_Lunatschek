// composables/useConferenceData.ts
import { ref, computed } from 'vue'
import type { ConferenceData, Session, Speaker, Track, Room } from '../types/conference'
import rawData from '../public/conference-data.json'

// Geteilter State mit statischem Initialwert für SSR/Prerendering
const data = ref<ConferenceData>(rawData as unknown as ConferenceData)
let hasFetchedClient = false

export const useConferenceData = () => {
    // Echter Client-Fetch auf /conference-data.json, damit die SWR-Regel im Service Worker greift
    if (import.meta.client && !hasFetchedClient) {
        hasFetchedClient = true
        fetch('/conference-data.json')
            .then((res) => (res.ok ? res.json() : null))
            .then((freshData: ConferenceData | null) => {
                if (freshData) {
                    data.value = freshData
                }
            })
            .catch(() => {
                // Offline ohne Cache: Initialwert / Service-Worker-Cache bleibt erhalten
            })
    }

    const sessions = computed<Session[]>(() => data.value?.sessions || [])
    const speakers = computed<Speaker[]>(() => data.value?.speakers || [])
    const tracks = computed<Track[]>(() => data.value?.tracks || [])
    const rooms = computed<Room[]>(() => data.value?.rooms || [])
    const days = computed<string[]>(() => data.value?.conference?.dates || ['2026-09-15', '2026-09-16'])
    const levels = computed<string[]>(() => ['Einsteiger', 'Fortgeschritten', 'Experte'])

    const getSessionById = (id: string) =>
        computed(() => sessions.value.find((s) => s.id === id))

    const getSpeakerById = (id: string) =>
        computed(() => speakers.value.find((sp) => sp.id === id))

    const getTrackById = (trackId: string) =>
        computed(() => tracks.value.find((t) => t.id === trackId))

    const getRoomById = (roomId: string) =>
        computed(() => rooms.value.find((r) => r.id === roomId))

    const getSpeakersForSession = (session: Session) =>
        computed(() => speakers.value.filter((sp) => session.speakerIds?.includes(sp.id)))

    const getSessionsForSpeaker = (speakerId: string) =>
        computed(() => sessions.value.filter((s) => s.speakerIds?.includes(speakerId)))

    const getSessionsByIds = (ids: string[]) =>
        computed(() => sessions.value.filter((s) => ids.includes(s.id)))

    return {
        data,
        sessions,
        speakers,
        tracks,
        rooms,
        days,
        levels,
        getSessionById,
        getSpeakerById,
        getTrackById,
        getRoomById,
        getSpeakersForSession,
        getSessionsForSpeaker,
        getSessionsByIds,
    }
}