import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotifyCard from '../components/NotifyCard';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function OrderConfirmedScreen() {
  const scale = useSharedValue(0);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, checkStyle]}>
          <Ionicons name="checkmark-circle-outline" size={80} color={colors.primary} />
        </Animated.View>

        <Text style={styles.title}>¡Pedido recibido!</Text>
        <Text style={styles.subtitle}>En breve comenzamos a prepararlo.</Text>

        <View style={styles.cardContainer}>
          <NotifyCard />
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Volver al menú</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  iconContainer: { marginBottom: 8 },
  title: { fontSize: 24, fontFamily: fonts.h1, color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 16, fontFamily: fonts.p, color: colors.textMuted, textAlign: 'center', marginBottom: 20 },
  cardContainer: { width: '100%' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: colors.card, fontSize: 16, fontFamily: fonts.h2 },
});