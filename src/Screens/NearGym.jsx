import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const NearGym = () => {
  const [gyms, setGyms] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchGyms = async () => {
      const location = `${region.latitude},${region.longitude}`;
      const radius = 5000;
      const type = 'gym';
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDnhoegBuugKFlvj2Vq7wnLtPlEI73fGnk&location=${location}&radius=${radius}&type=${type}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setGyms(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGyms();
  }, [region]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChange={setRegion}
      >
        {gyms.map(gym => (
          <Marker
            key={gym.place_id}
            coordinate={{
              latitude: gym.geometry.location.lat,
              longitude: gym.geometry.location.lng,
            }}
            title={gym.name}
            description={gym.vicinity}
          />
        ))}
      </MapView>
      {/* <View style={{ position: 'absolute', bottom: 0 }}>
        {gyms.map(gym => (
          <View key={gym.place_id}>
            <Text>{gym.name}</Text>
            <Text>{gym.vicinity}</Text>
            <Text>{gym.rating}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default NearGym;
