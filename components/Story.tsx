import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import OptionalLink from './OptionalLink';


interface Props {
  item: Item | undefined,
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
        disabled={item === undefined}
      />
      {item ? (
        <OptionalLink href={item.url as ExternalPathString} enabled={true}>
          <Surface style={styles.surface}>
            <Text variant="bodyLarge">{item.title}</Text>
            <Text variant="bodyMedium">{item.descendants} comments</Text>
          </Surface>
        </OptionalLink>
      ) : (
        <Text variant="bodyLarge">Failed to load item</Text>
      )}
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
    padding: 15,
    borderRadius: 10,
    width: '100%',
    gap: 4,
  },
  button: {
  },
});