import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../context/Authemtication';

const NearGym = () => {
  const [gyms, setGyms] = useState([]);
  const {logout,user}=useAuth()
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${user.location.latitude},${user.location.longitude}&radius=5000&type=gym&key=AIzaSyDnhoegBuugKFlvj2Vq7wnLtPlEI73fGnk`
        );
        const data = await response.json();
        setGyms(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGyms();
  }, []);

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: user.location.latitude,
        longitude: user.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {gyms.map((gym) => (
        <Marker
          key={gym.place_id}
          coordinate={{
            latitude: gym.geometry.location.lat,
            longitude: gym.geometry.location.lng,
          }}
          title={gym.name}
          description={`Rating: ${gym.rating}`}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default NearGym;
