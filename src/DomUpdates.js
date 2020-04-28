import $ from 'jquery'

const domUpdates = {

  displayMgrView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').removeClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayGuestView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').removeClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayRoomsView() {
    $('.rooms-view').removeClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayBookView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').removeClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayHotelView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').removeClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayLoginView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').removeClass('hide')
    $('.contact-view').addClass('hide')
  },

  displayContactView() {
    $('.rooms-view').addClass('hide')
    $('.book-view').addClass('hide')
    $('.hotel-view').addClass('hide')
    $('.guest-view').addClass('hide')
    $('.mgr-view').addClass('hide')
    $('.login-view').addClass('hide')
    $('.contact-view').removeClass('hide')
  }
}

export default domUpdates