import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {useEventContext} from '../store/EventContext';
import EventItem from '../components/eventItem';

function Registrations() {
  const {registrations} = useEventContext();
  return (
    <>
      {registrations.length === 0 && (
        <View style={styles.notFoundContainer}>
          {' '}
          <Text style={styles.notFound}>No Registrations Found </Text>
        </View>
      )}
      <FlatList
        data={registrations}
        renderItem={itemData => {
          return <EventItem event={itemData.item} />;
        }}
        keyExtractor={item => item.id.toString()} // هذا السطر مهم لتعريف الـ key لكل عنصر
        contentContainerStyle={styles.content}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  notFound: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Registrations;
