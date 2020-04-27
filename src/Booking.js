class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = []
  }

  createBooking(userID, todayDate, roomNum) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': Number(userID),
        'date': todayDate,
        'roomNumber': Number(roomNum),
      }),
    })
    .then(response => console.log(response.json()))
    .catch(error => console.error(error));
  }

  cancelBooking(bookingID) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: Number(bookingID)})
    })
      .then(console.log('deleted'))
      .catch(error => console.error(error));
  }
}

export default Booking