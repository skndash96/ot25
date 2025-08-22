export interface ScheduleItem {
  id: string
  title: string
  time: string
  location: string
  type: 'Pro Show' | 'Event' | 'Guest Lecture' | 'Other'
}

export interface ScheduleDay {
  fullDate: string
  items: ScheduleItem[]
}

export const getEventColor = (idx: number) => {
  switch (idx) {
    case 0:
      return 'bg-violet-500'
    case 1:
      return 'bg-purple-500'
    case 2:
      return 'bg-fuchsia-500'
    case 3:
      return 'bg-pink-500'
    case 4:
      return 'bg-rose-500'
    case 5:
      return 'bg-red-500'
    case 6:
      return 'bg-orange-500'
    case 7:
      return 'bg-emerald-500'
    case 8:
      return 'bg-teal-500'
    case 9:
      return 'bg-blue-500'
    default:
      return 'bg-slate-500'
  }
}

export const scheduleData: ScheduleDay[] = [
  {
    fullDate: '2025-08-25',
    items: [
      {
        id: '1',
        title: 'Inauguration',
        time: '9:30 AM to 11:00 AM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '2',
        title: 'Academic programme details by Dean (Academic)',
        time: '11:30 AM to 12:45 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '3',
        title: 'Address by Department Heads',
        time: '2:00 PM to 3:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '4',
        title: 'Students’ Welfare at NITT by Dean (SW)',
        time: '3:00 PM to 3:20 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '5',
        title: 'What’s in the store',
        time: '3:25 PM to 3:35 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '6',
        title: 'Student interaction with respective department heads',
        time: '3:40 PM to 5:00 PM',
        location: 'Orion',
        type: 'Other',
      },
      {
        id: '7',
        title: 'Sponsor GL',
        time: '5:30 PM to 6:30 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
    ],
  },
  {
    fullDate: '2025-08-26',
    items: [
      {
        id: '1',
        title: 'Yoga/Sports',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'Omega Lecture',
        time: '9:30 AM to 11:00 AM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'Road Safety and Drug Awareness - DSP',
        time: '11:00 AM to 11:30 AM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'NCC/NSS/NSO briefing',
        time: '11:30 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '5',
        title: 'Bank Briefing',
        time: '2:30 PM to 3:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '6',
        title: 'ICC Lecture',
        time: '3:00 PM to 4:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '7',
        title: 'Streaks Performance',
        time: '4:00 PM to 4:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
      },
      {
        id: '8',
        title: 'The Art of Living Lecture',
        time: '5:00 PM to 6:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '9',
        title: 'OT - Flashmob + Sings',
        time: '6:00 PM to 7:00 PM',
        location: 'Barn Hall Informal Stage',
        type: 'Event',
      },
      {
        id: '10',
        title: 'Music troupe performance',
        time: '7:00 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
      },
    ],
  },
  {
    fullDate: '2025-08-27',
    items: [
      {
        id: '1',
        title: 'Yoga/Sports',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'Campus Carnival',
        time: '9:30 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '3',
        title: 'Campus Carnival',
        time: '2:30 PM to 4:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '4',
        title: 'Fire and Safety drill Lecture',
        time: '4:30 PM to 5:30 PM',
        location: 'Informal Stage',
        type: 'Guest Lecture',
      },
      {
        id: '5',
        title: 'FSOC Movie Screening',
        time: '6:00 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
    ],
  },
  {
    fullDate: '2025-08-28',
    items: [
      {
        id: '1',
        title: 'Yoga/Sports',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'Lecture on physical and mental health - CGC',
        time: '9:00 AM to 10:00 AM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'CAD Round 1',
        time: '10:00 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '4',
        title: 'Spicmacay performance',
        time: '3:00 PM to 4:00 PM',
        location: 'EEE Audi',
        type: 'Pro Show',
      },
      {
        id: '5',
        title: 'Amruthavarshini Performance',
        time: '3:00 PM to 4:00 PM',
        location: 'A13',
        type: 'Pro Show',
      },
      {
        id: '6',
        title: 'Scientists’ Panel',
        time: '4:30 PM to 6:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '7',
        title: 'Talk on Animal Safety (PETA)',
        time: '4:30 PM to 6:00 PM',
        location: 'A12 Hall',
        type: 'Guest Lecture',
      },
      {
        id: '8',
        title: 'Council Briefing',
        time: '6:00 PM to 6:30 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '9',
        title: 'Dance Troupe performance',
        time: '7:00 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
      },
    ],
  },
  {
    fullDate: '2025-08-29',
    items: [
      {
        id: '1',
        title: 'Yoga/Sports',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'CEO Panel',
        time: '11:00 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'Elinoid’s scholarship GL',
        time: '2:30 PM to 3:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'Anidev Singh GL',
        time: '3:00 PM to 4:30 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '5',
        title: 'Thespians Society Performance',
        time: '4:30 PM to 6:00 PM',
        location: 'EEE Audi',
        type: 'Pro Show',
      },
      {
        id: '6',
        title: 'Fest Briefing',
        time: '6:00 PM to 7:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
    ],
  },
  {
    fullDate: '2025-08-30',
    items: [
      {
        id: '1',
        title: 'Zero Round Event',
        time: '10:00 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '2',
        title: 'CAD round 2 and 3',
        time: '2:30 PM to 5:00 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '3',
        title: 'Infosys Director’s GL',
        time: '5:00 PM to 6:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'Time Capsule',
        time: '6:30 PM to 7:30 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '5',
        title: 'Fresher’s Night',
        time: '7:30 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
      },
    ],
  },
]
