import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useEventContext} from '../store/EventContext';

function EventDetailsScreen({route}) {
  const {events, addToRegistration} = useEventContext();
  const eventId = route.params.eventId;
  console.log('id is', eventId);
  const selectedEvent = events.find(event => event.id === eventId);
  const {
    title,
    image,
    date,
    location,
    description,
    speakers,
    price,
    capacity,
    availableSpots,
    time,
  } = selectedEvent;

  function handleRegistration() {
    addToRegistration(selectedEvent);
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Date & Time: </Text>
        {date} at {time}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Location: </Text>
        {location}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Description: </Text>
        {description}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Speakers: </Text>
        {speakers.join(', ')}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Price: </Text>
        {price === 0 ? 'Free' : `$${price}`}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Capacity: </Text>
        {capacity}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Available Spots: </Text>
        {availableSpots}
      </Text>
      <TouchableOpacity onPress={handleRegistration}>
        <View style={styles.btnMD}>
          <Text style={styles.btnMDText}>Register</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  btnMD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#0569FF',
    borderColor: '#0569FF',
    marginVertical: 20,
  },
  btnMDText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});

export default EventDetailsScreen;
