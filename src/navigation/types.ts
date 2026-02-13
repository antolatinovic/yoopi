import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps = StackScreenProps<RootStackParamList>;

export type RootStackParamList = {
  [Paths.Startup]: undefined;
};
