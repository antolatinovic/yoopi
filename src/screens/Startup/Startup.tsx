import type { RootScreenProps } from '@/navigation/types';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';

function Startup({ navigation }: RootScreenProps) {
  const { fonts, gutters, layout } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Startup }],
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Text style={[fonts.size_24, fonts.bold]}>Yoopi</Text>
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
      </View>
    </SafeScreen>
  );
}

export default Startup;
