import { Surface, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import { ExternalPathString } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface Props {
  href: ExternalPathString | undefined;
}

export default function LinkImage({ href }: Props) {
  const theme = useTheme();

  return (
    <Surface elevation={3} style={styles.container} mode="flat">
      <OptionalLink href={href}>
        <MaterialCommunityIcons
          name="link"
          color={href ? theme.colors.primary : theme.colors.onSurfaceDisabled}
          size={31}
        />
      </OptionalLink>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    margin: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
