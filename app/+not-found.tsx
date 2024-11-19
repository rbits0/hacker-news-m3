import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';


export default function NotFoundPage() {
  const theme = useTheme();
  
  return <>
    <Stack.Screen options={{ title: 'Page Not Found' }} />
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="displayLarge">Page not found</Text>
    </View>
  </>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});