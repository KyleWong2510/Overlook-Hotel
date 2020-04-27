class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.userBookings = [];
    this.role;
  }

  addToBookings(bookingsData) {
    this.userBookings = bookingsData.filter(booking => booking.uerID === this.id)
  }

  calcAmountSpent(roomsData) {
    return this.userBookings.reduce((total, booking) => {
      roomsData.forEach(room => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight
        }
      })
      return total
    }, 0)
  }
}

export default User