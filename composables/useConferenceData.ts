
import { ref, computed } from 'vue'
import type { ConferenceData, Session, Speaker, Track, Room } from '../types/conference'


import rawData from '../public/conference-data.json'

export const useConferenceData = () => {
  const data = ref<ConferenceData>(rawData as unknown as ConferenceData)


  const sessions = computed<Session[]>(() => data.value?.sessions || [])
  const speakers = computed<Speaker[]>(() => data.value?.speakers || [])
  const tracks = computed<Track[]>(() => data.value?.tracks || [])
  const rooms = computed<Room[]>(() => data.value?.rooms || [])
  const days = computed<string[]>(() => data.value?.conference?.dates || ['2026-09-15', '2026-09-16'])
  const levels = computed<string[]>(() => ['Einsteiger', 'Fortgeschritten', 'Experte'])


  const getSessionById = (id: string) => {
    return computed(() => sessions.value.find(s => s.id === id))
  }

 
  const getSpeakerById = (id: string) => {
    return computed(() => speakers.value.find(sp => sp.id === id))
  }


  const getTrackById = (trackId: string) => {
    return computed(() => tracks.value.find(t => t.id === trackId))
  }

 
  const getRoomById = (roomId: string) => {
    return computed(() => rooms.value.find(r => r.id === roomId))
  }

  const getSpeakersForSession = (session: Session) => {
    return computed(() => speakers.value.filter(sp => session.speakerIds?.includes(sp.id)))
  }


  const getSessionsForSpeaker = (speakerId: string) => {
    return computed(() => sessions.value.filter(s => s.speakerIds?.includes(speakerId)))
  }

 
  const getSessionsByIds = (ids: string[]) => {
    return computed(() => sessions.value.filter(s => ids.includes(s.id)))
  }

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
    getSessionsByIds
  }
}