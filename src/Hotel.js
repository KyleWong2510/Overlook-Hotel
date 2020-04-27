class Hotel {
  constructor(roomsData, bookingsData) {
    this.allRooms = roomsData;
    this.roomsBooked = [];
    this.roomsAvailable = [];
    this.allBookings = bookingsData;
    this.pastBookings = [];
    this.todaysBookings = [];
    this.upcomingBookings = [];
  }
  
  filterRoomsBooked(date) {
    this.allBookings.forEach(booking => {
      return this.allRooms.forEach(room => {
        if(booking.date === date && booking.roomNumber === room.number) {
          this.roomsBooked.push(room)
        } 
      })
    })
  }

  filterRoomsAvailable() {
    this.roomsAvailable = this.allRooms.filter(room => !this.roomsBooked.includes(room))
  }

  filterUpcomingBookings(date) {
    this.upcomingBookings = this.allBookings.filter(booking => booking.date > date)
  }

  filterCurrentBookings(date) {
    this.todaysBookings = this.allBookings.filter(booking => booking.date === date)
  }

  filterPastBookings(date) {
    this.pastBookings = this.allBookings.filter(booking => booking.date < date)
  }

  calculateTotalRevenue() {
    return this.todaysBookings.reduce((revenue, booking) => {
      this.roomsBooked.forEach(room => {
        if(booking.roomNumber === room.number) {
          revenue += room.costPerNight
        }
      })
      return Number(revenue.toFixed(2))
    }, 0)
  }

  calculatePercentOccupied() {
    let percent = this.roomsBooked.length / this.allRooms.length
    return `${percent * 100}%`
  }
}

export default Hotel