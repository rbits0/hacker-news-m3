import { createIconSetFromFontello } from '@expo/vector-icons';

import fontelloConfig from '@/assets/fonts/fontello/config.json';

const HackerNewsM3Icon = createIconSetFromFontello(
  fontelloConfig,
  'hackernewsm3icons',
  'hackernewsm3icons.ttf',
);
export default HackerNewsM3Icon;
