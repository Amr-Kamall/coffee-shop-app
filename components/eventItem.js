import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

function EventItem({event}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={event.id}
      onPress={() => {
        navigation.navigate('eventsScreens', {
          screen: 'eventDetails',
          params: {eventId: event.id},
        });
      }}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt="eventCard"
            resizeMode="cover"
            style={styles.cardImg}
            source={{uri: event.image}}
          />
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{event.title}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardDates}>{event.date}</Text>
            <Text>{event.location}</Text>
          </View>
          <Text style={styles.cardPrice}>
            <Text style={styles.price}>${event.price} </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  cardDetails: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: '#595a63',
  },
  cardPrice: {
    marginTop: 6,
  },
  price: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EventItem;
