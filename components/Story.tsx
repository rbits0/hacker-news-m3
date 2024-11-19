import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';


interface Props {
  item: Item
}

export default function Story({ item }: Props) {
  

  return (
    <View style={styles.container}>
      <IconButton
        mode="contained"
        style={styles.button}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="heart-outline" size={size} color={color}/>
        )}
        onPress={() => {}}
      />
      <Surface style={styles.surface}>
        <Text variant="bodyLarge">{item.title}</Text>
      </Surface>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  button: {
  },
});