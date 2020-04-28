import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import moment from 'moment';
import User from './User';
import Booking from './Booking'
import Hotel from './Hotel';
import domUpdates from './DomUpdates'

let usersRepo = [];
let roomsRepo = [];
let bookingsRepo = [];
let usersData;
let roomsData;
let bookingsData;
let hotel;
// let dateToday = moment().format('YYYY/MM/DD')
let dateToday = '2020/04/20'
console.log('today', dateToday)
let currentUser;

const createUsers = (users) => {
  users.forEach(user => {
    const newUser = new User(user);
    usersRepo.push(newUser)
  })
}

const pushRooms = (rooms) => {
  rooms.forEach(room => {
    roomsRepo.push(room)
  })
}

const createBookings = (bookings) => {
  bookings.forEach(booking => {
    const newBooking = new Booking(booking);
    bookingsRepo.push(newBooking)
  })
}


// const userHandler = (user) => {
  //   user.addToBookings(bookingsRepo);
  // user.calcAmountSpent(roomsRepo)
  // }
  
  const hotelHandler = (date) => {
    hotel.filterRoomsBooked(date)
    hotel.filterRoomsAvailable()
    hotel.filterUpcomingBookings(date)
    hotel.filterCurrentBookings(date)
    hotel.filterPastBookings(date)
    hotel.calculateTotalRevenue()
    hotel.calculatePercentOccupied()
  }
  
  const createHotel = (rooms, bookings) => {
    hotel = new Hotel(rooms, bookings)
    hotelHandler(dateToday)
    console.log(hotel)
  }

const fetchData = () => {
  usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch(error => console.error(error));
    
  roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .catch(error => console.error(error))

  bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .catch(error => console.error(error))

  return Promise.all([usersData, roomsData, bookingsData])
    .then(response => {
      usersData = response[0].users;
      roomsData = response[1].rooms;
      bookingsData = response[2].bookings;      
      
      createUsers(usersData);
      pushRooms(roomsData);
      createBookings(bookingsData);
      createHotel(roomsData, bookingsData)
    })
    // .then(() => {
    //   hotelHandler(dateToday)    
    // })
    .catch(error => console.error(error))
}

//PUT IN DOM UPDATES
const displayUserInfo = (user) => {
  user.addToBookings(bookingsRepo);
  $('#welcome-guest').text(`Welcome, ${user.name}`)
  let formatted = Number(user.calcAmountSpent(roomsRepo).toFixed(2))
  $('#amount').text(`$${formatted}`)
  user.userBookings.forEach(booking => {
    $(`<div class='booking-card' id=${booking.id}>
      <p>${booking.id}<p> 
      <p>Room: ${booking.roomNumber}</p>
      <p>Date: ${booking.date}</p>
    <div>`)
    .appendTo('#user-bookings')
  })
}

const displayMgrInfo = () => {
  console.log(hotel)
  let revenue = Number(hotel.calculateTotalRevenue())
  $('#revenue').text(`$${revenue}`)
  $('#num-rooms').text(`${hotel.roomsAvailable.length}`)
  $('#percent').text(`${hotel.calculatePercentOccupied()}`)
  
  hotel.roomsAvailable.forEach(room => {
    $(`<div class='mgr-available-rooms-card' id='${room.number}'>
      <div class='card-half'>
        <span>Room: ${room.number}</span>
        <span>Type: ${room.roomType}</span>
        <span>Bidet: ${room.bidet}</span>
      </div>
      <div class='card-half'>
        <span>Bed Count: ${room.numBeds}</span>
        <span>Bed Size: ${room.bedSize}</span>
        <span>Cost per Night: $${room.costPerNight}</span>
      </div>

      <button class='mgr-book-this-room'>Book Now</button>
    </div>`)
      .appendTo($('#mgr-rooms-container'))
  })
}

const displayDashboards = () => {
  if($('#user-name-input').val() === 'manager' && $('#password-input').val() === 'overlook2020') {
    domUpdates.displayMgrView()
    currentUser = 'manager'
    //How can we access a role?  Extend mgr?
    // currentUser.role = 'manager'
    displayMgrInfo()
  }
  for (let i = 0; i < 51; i++) {
    if($('#user-name-input').val() === `customer${i}` && $('#password-input').val() === 'overlook2020') {
      domUpdates.displayGuestView()
      currentUser = usersRepo.find(user => user.id === i)
      currentUser.role = 'guest'
      displayUserInfo(currentUser)
      // userHandler(currentUser)
    }
  }
  console.log(currentUser)
  // else {
    //   alert('You must fill out the form with valid information')
    // }
  }
  


//COME BACK TO THIS FN
// const displayRoomsByType = (roomTypes) => {
//   $('#rooms-by-type-title').text(`Displaying all ${roomTypes}`)
//   $('#rooms-available-by-type')
// }

$('#nav-home-btn').click(domUpdates.displayHotelView)
$('#nav-rooms-btn').click(domUpdates.displayRoomsView)
$('#nav-book-btn').click(domUpdates.displayBookView)
$('#nav-contact-btn').click(domUpdates.displayContactView)
$('#nav-login-btn').click(domUpdates.displayLoginView)
$('#login-btn').click(displayDashboards)

fetchData()