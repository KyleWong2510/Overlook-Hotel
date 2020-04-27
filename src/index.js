import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import User from './User';
import Booking from './Booking'
import Hotel from './Hotel';

let usersRepo = [];
let roomsRepo = [];
let bookingsRepo = [];
let usersData;
let roomsData;
let bookingsData;
let hotel;

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
    .catch(error => console.error(error))
}


fetchData()