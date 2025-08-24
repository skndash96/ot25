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
        title: 'Academic programme details by Dean',
        time: '11:15 AM to 12:15 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'Address by Department Heads and Centers',
        time: '2:00 PM to 3:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '4',
        title: 'Students’ Welfare Office',
        time: '3:05 PM to 3:55 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '5',
        title: 'What’s in the store',
        time: '3:55 PM to 4:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '6',
        title: 'Student interaction with respective HODs',
        time: '4:15 PM to 5:15 PM',
        location: 'Orion',
        type: 'Other',
      },
    ],
  },
  {
    fullDate: '2025-08-26',
    items: [
      {
        id: '1',
        title: 'Yoga',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'BIS – Lecture',
        time: '9:30 AM to 11:00 AM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'Road Safety and Drug Awareness – ISP',
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
        title: 'Campus Carnival',
        time: '9:30 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '2',
        title: 'Campus Carnival',
        time: '2:30 PM to 4:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '3',
        title: 'Fire and Safety drill Lecture',
        time: '4:30 PM to 5:30 PM',
        location: 'Informal Stage',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'FSOC Movie Screening',
        time: '6:00 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      }
    ],
  },
  {
    fullDate: '2025-08-28',
    items: [
      {
        id: '1',
        title: 'Yoga',
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
        time: '2:30 PM to 4:00 PM',
        location: 'EEE Auditorium',
        type: 'Pro Show',
      },
      {
        id: '5',
        title: 'Amruthavarshini Performance',
        time: '3:00 PM to 4:00 PM',
        location: 'A13 Hall',
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
        title: 'PETA GL',
        time: '4:30 PM to 6:00 PM',
        location: 'A13 Hall',
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
        title: 'Yoga',
        time: '6:30 AM to 7:30 AM',
        location: 'Barn Hall/NSO',
        type: 'Other',
      },
      {
        id: '2',
        title: 'Indian Knowledge Eternal - Siddhanta GL',
        time: '10:00 AM to 11:00 AM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '3',
        title: 'CEO Panel',
        time: '11:00 AM to 12:30 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'RECAL scholarship GL',
        time: '2:30 PM to 3:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '5',
        title: 'Role of Sports in Physical Health by Dr. Anidev Singh',
        time: '3:00 PM to 4:30 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '6',
        title: 'Thespians Society Performance',
        time: '4:30 PM to 6:00 PM',
        location: 'EEE Auditorium',
        type: 'Pro Show',
      },
      {
        id: '7',
        title: 'Fest Briefing',
        time: '6:00 PM to 7:00 PM',
        location: 'Barn Hall',
        type: 'Other',
      },
      {
        id: '8',
        title: 'LED show and Magic Show',
        time: '7:00 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
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
        time: '2:30 AM to 5:00 AM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '3',
        title: 'GL by Infosys CEO & MD',
        time: '5:00 PM to 6:00 PM',
        location: 'Barn Hall',
        type: 'Guest Lecture',
      },
      {
        id: '4',
        title: 'Time Capsule',
        time: '6:30 PM to 7:30 PM',
        location: 'Barn Hall',
        type: 'Event',
      },
      {
        id: '5',
        title: 'Fresher’s night',
        time: '7:30 PM to 8:30 PM',
        location: 'Barn Hall',
        type: 'Pro Show',
      },
    ],
  },
]
