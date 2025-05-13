import EventCard from '../components/EventCard'

const sampleEvents = [
  { id: 1, title: 'React Conference', date: '2025-05-01', description: 'A React-focused event.' },
  { id: 2, title: 'NodeJS Summit', date: '2025-06-15', description: 'Everything Node and Express.' },
]

const Events = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events
