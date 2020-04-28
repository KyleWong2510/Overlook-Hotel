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
let dateToday = moment().format('YYYY/MM/DD')
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

const createHotel = (rooms, bookings) => {
  hotel = new Hotel(rooms, bookings)
}

const userHandler = (user) => {
  user.addToBookings(bookingsRepo);
  user.calcAmountSpent(roomsRepo)
}

const hotelHandler = (date) => {
  hotel.filterRoomsBooked(date)
  hotel.filterRoomsAvailable()
  hotel.filterUpcomingBookings(date)
  hotel.filterCurrentBookings(date)
  hotel.filterPastBookings(date)
  hotel.calculateTotalRevenue()
  hotel.calculatePercentOccupied()
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
    .then(() => {
      hotelHandler(dateToday)    
    })
    .catch(error => console.error(error))
}

const displayDashboards = () => {
  if($('#user-name-input').val() === 'manager' && $('#password-input').val() === 'overlook2020') {
    domUpdates.displayMgrView()
    currentUser = 'manager'
    //How can we access a role?  Extend mgr?
    currentUser.role = 'manager'
  }
  for (let i = 0; i < 51; i++) {
    if($('#user-name-input').val() === `customer${i}` && $('#password-input').val() === 'overlook2020') {
      domUpdates.displayGuestView()
      currentUser = usersRepo.find(user => user.id === i)
      currentUser.role = 'guest'
      userHandler(currentUser)
    }
  }
  console.log(currentUser)
  // else {
  //   alert('You must fill out the form with valid information')
  // }
}
$('#nav-home-btn').click(domUpdates.displayHotelView)
$('#nav-rooms-btn').click(domUpdates.displayRoomsView)
$('#nav-book-btn').click(domUpdates.displayBookView)
$('#nav-contact-btn').click(domUpdates.displayContactView)
$('#nav-login-btn').click(domUpdates.displayLoginView)
$('#login-btn').click(displayDashboards)

fetchData()