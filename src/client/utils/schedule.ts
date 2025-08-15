export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'Pro Show' | 'Event' | 'Guest Lecture' | 'Other';
}

export interface ScheduleDay {
  fullDate: string;
  items: ScheduleItem[];
}

export const getEventColor = (idx: number) => {
  switch (idx) {
    case 1:
      return 'bg-pink-400'
    case 2:
      return 'bg-fuchsia-400'
    case 3:
      return 'bg-blue-400'
      case 4:
        return 'bg-teal-400'
    case 5:
      return 'bg-emerald-400'
    case 6:
      return 'bg-pink-300'
    default:
      return 'bg-indigo-400'
  }
}

export const scheduleData: ScheduleDay[] = [
  {
    fullDate: "2024-08-19",
    items: [
      {
        id: "0-1",
        title: "Registration & Check-in",
        time: "9:00 AM - 11:00 AM",
        location: "Main Lobby",
        type: "Other"
      },
      {
        id: "0-2",
        title: "Welcome Refreshments",
        time: "11:00 AM - 12:00 PM",
        location: "Cafeteria",
        type: "Other"
      }
    ]
  },
  {
    fullDate: "2024-08-20",
    items: [
      {
        id: "1-1",
        title: "Pre-Orientation Meeting",
        time: "10:00 AM - 12:00 PM",
        location: "Conference Hall",
        type: "Pro Show"
      },
      {
        id: "1-2",
        title: "Campus Tour",
        time: "2:00 PM - 4:00 PM",
        location: "Campus Grounds",
        type: "Other"
      }
    ]
  },
  {
    fullDate: "2024-08-21",
    items: [
      {
        id: "2-1",
        title: "Inauguration",
        time: "8:00 AM - 12:00 PM",
        location: "Barn Hall",
        type: "Guest Lecture"
      },
      {
        id: "2-2", 
        title: "Academic Programme details by Dean",
        time: "8:00 AM - 12:00 PM",
        location: "A2 Hall",
        type: "Other"
      },
      {
        id: "2-3",
        title: "Special Lecture: Role of Parents in Education",
        time: "9:00 AM - 12:00 PM", 
        location: "A2 Hall",
        type: "Guest Lecture"
      },
      {
        id: "2-4",
        title: "Session by Dean Student's Welfare and Office",
        time: "9:00 AM - 12:00 PM",
        location: "A2 Hall", 
        type: "Guest Lecture"
      },
      {
        id: "2-5",
        title: "What's in the store",
        time: "9:00 AM - 12:00 PM",
        location: "Barn Hall",
        type: "Other"
      }
    ]
  },
  {
    fullDate: "2024-08-22",
    items: [
      {
        id: "3-1",
        title: "Orientation Workshop",
        time: "9:00 AM - 11:30 AM",
        location: "Main Auditorium",
        type: "Pro Show"
      },
      {
        id: "3-2",
        title: "Department Meet & Greet",
        time: "12:00 PM - 2:00 PM",
        location: "Various Departments",
        type: "Other"
      },
      {
        id: "3-3",
        title: "Technology Integration Seminar",
        time: "3:00 PM - 5:00 PM",
        location: "Tech Center",
        type: "Pro Show"
      }
    ]
  },
  {
    fullDate: "2024-08-23",
    items: [
      {
        id: "4-1",
        title: "Final Assessment & Feedback",
        time: "10:00 AM - 12:00 PM",
        location: "Main Hall",
        type: "Pro Show"
      },
      {
        id: "4-2",
        title: "Closing Ceremony",
        time: "2:00 PM - 4:00 PM",
        location: "Barn Hall",
        type: "Pro Show"
      }
    ]
  }
];