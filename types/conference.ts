export interface Track {
  id: string
  name: string
}

export interface Room {
  id: string
  name: string
  capacity: number
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  sessionIds: string[]
}

export interface Session {
  id: string
  title: string
  abstract: string
  trackId: string
  speakerIds: string[]
  day: string          
  startTime: string    
  endTime: string      
  roomId: string       
  level: string        
  format: string       
}

export interface ConferenceInfo {
  name: string
  tagline: string
  dates: string[]
  location: string
  timezone: string
}

export interface ConferenceData {
  conference: ConferenceInfo
  tracks: Track[]
  rooms: Room[]
  speakers: Speaker[]
  sessions: Session[]
}