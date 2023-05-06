$(document).ready(function () {
  const amenityObject = {};

  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityObject[$(this).data('id')] = $(this).data('name');
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObject[$(this).data('id')];
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('notAvailable');
      $('#api_status').toggleClass('available');
    }
  });

  fosterForImaginaryFriends();

  $('button').click(function () {
    console.log('Deiwin');
    fosterForImaginaryFriends({ amenities: Object.keys(amenityObject) });
  });

  function placeArticle (data) {
    $('section.places').empty();
    for (const place of data) {
      $('section.places').append('<article><div class="title_box"><h2></h2><div class="price_by_night"></div></div><div class="information"><div class="max_guest"></div><div class="number_rooms"></div><div class="number_bathrooms"></div></div><div class="user"></div><div class="description"></div></article>');

      $('div.title_box h2').last().text(place.name);
      $('.price_by_night').last().text('$' + place.price_by_night);
      // number of Guests
      if (place.max_guest !== 1) {
        $('.max_guest').last().text(`${place.max_guest} Guests`);
      } else {
        $('.max_guest').last().text(`${place.max_guest} Guest`);
      }
      // number of Rooms
      if (place.number_rooms !== 1) {
        $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
      } else {
        $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
      }
      // number of Bathrooms
      if (place.number_bathrooms !== 1) {
        $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
      } else {
        $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
      }
      // place Description
      $('.description').last().html(place.description);
    }
  }

  function fosterForImaginaryFriends (dictionary = {}) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(dictionary),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data) {
        placeArticle(data);
      }
    });
  }
});
