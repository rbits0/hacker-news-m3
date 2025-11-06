import { Appbar } from 'react-native-paper';

interface Props {
  title?: string;
}

export default function NavigationBar({ title }: Props) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title ? title : ''} />
    </Appbar.Header>
  );
}
