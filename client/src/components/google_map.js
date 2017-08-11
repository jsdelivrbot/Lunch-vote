import React, { Component } from "react";
import { addRestaurant_google } from "../actions/action_restaurants";

export class GoogleMap_show extends Component {
  componentDidMount() {
    //this is the defaule place of the company
    const evebyeve_location = {lat: 34.0874994, lng: -118.1482477}
    //this is the main map that I created
    const map = new google.maps.Map(this.refs.map, {
      zoom: 18,
      center : evebyeve_location
    })

    const infowindow = new google.maps.InfoWindow();
    //Search through the map just created
    const service = new google.maps.places.PlacesService(map);
    //this is used to search for query text
    service.textSearch({
      location: evebyeve_location,
      radius: 500,
      query: `${this.props.name} ${this.props.address}`
    }, callback);

    //add marker to the map
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    //create marker and add it to the map
    function createMarker(place) {
      var placeId = place.place_id;
      var placeLoc = place.geometry.location;
      var lat = placeLoc.lat();
      var lng = placeLoc.lng();
      map.setCenter(placeLoc);
      var content_string = '';
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      //display the detail of the restaurant
      service.getDetails({
        placeId : placeId
      },function(place, status){
        //specific way to display it through google map;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //In case the restaurant does not has its owen website
          var name_search = encodeURIComponent(place.name);
          var google_map_url = `https://www.google.com/maps/search/?api=1&query=${name_search}`
          if(place.website ){
            content_string = ('<div><strong>' + place.name + '</strong>' +
            '<br>' + 'Place address: ' + place.formatted_address +'<br>' +
            '<br>' + 'Phone number: ' + place.formatted_phone_number +'<br>' +
            '<br><a href=' + google_map_url + '>' + "View in google Map" +'</a><br>' +
            '<br><a href=' + place.website + '>' + "View in website" +'</a><br>')
          }
          else{
            content_string = ('<div><strong>' + place.name + '</strong>' +
            '<br>' + 'Place address: ' + place.formatted_address +'<br>' +
            '<br>' + 'Phone number: ' + place.formatted_phone_number +'<br>' +
            '<br><a href=' + google_map_url + '>' + "View in google Map" +'</a><br>')
          }
          //show the info through the marker
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(content_string);
              infowindow.open(map, this);
            })
        }
      })
    }
  }

  render() {
    const mapStyle = {
      height: '500px',
      width: '500px',
    };

    return (
        <div ref="map" style={mapStyle}></div>
    );
  }
}

export class GoogleMap_search extends Component {
  componentDidMount() {
    //this is the defaule place of the company
    const evebyeve_location = {lat: 34.0874994, lng: -118.1482477}
    //this is the main map that I created
    const map = new google.maps.Map(this.refs.map, {
      zoom: 14,
      center : evebyeve_location
    })

    const infowindow = new google.maps.InfoWindow();
    //Search through the map just created
    const service = new google.maps.places.PlacesService(map);
    //this is used to search for query text
    service.radarSearch({
      location: evebyeve_location,
      radius: 5000,
      keyword : "lunch",
      openNow : true
    }, callback);

    //add marker to the map
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function onSubmit(values) {
      addRestaurant_google(values, () => {
          this.props.history.push("/");
      });
    }

    //create marker and add it to the map
    function createMarker(place) {
      var placeId = place.place_id;
      var placeLoc = place.geometry.location;
      var lat = placeLoc.lat();
      var lng = placeLoc.lng();
      var content_string = '';
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      var google_map_url = (`https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`)
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<strong><center><a href=' + google_map_url + '>'
          + "View in google Map" +'</a></center></strong>'
          + '<div><form onSubmit={' + onSubmit({lat:lat,lng:lng})
          +'}><button type=submit'
          + 'className=btn btn-primary'
          + '>Add this restaurant</button></form></div>');
          infowindow.open(map, this);
        })
      }
    }

  render() {
    const mapStyle = {
      height: '500px',
      width: '1000px',
    };

    return (
        <div ref="map" style={mapStyle}></div>
    );
  }
}
