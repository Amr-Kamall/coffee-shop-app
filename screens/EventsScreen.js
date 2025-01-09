import React from 'react';
import {StyleSheet, SafeAreaView, Text, FlatList, View} from 'react-native';
import {useEventContext} from '../store/EventContext';
import EventItem from '../components/eventItem';

export default function EventsScreen() {
  const {events} = useEventContext();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Events</Text>
      </View>
      <FlatList
        data={events}
        renderItem={itemData => {
          return <EventItem event={itemData.item} />;
        }}
        keyExtractor={item => item.id.toString()} // هذا السطر مهم لتعريف الـ key لكل عنصر
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  /** Header */
  header: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
});
