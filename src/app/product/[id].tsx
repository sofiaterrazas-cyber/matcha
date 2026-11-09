import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { products } from '../../constants/products';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id) || products[0];

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: '/order', params: { productId: product.id } });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <Image source={product.image} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Bs {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Pedir</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { gap: 16 },
  backButton: { marginBottom: 8 },
  image: { width: '100%', height: 240, borderRadius: 32, marginBottom: 8 },
  name: { fontSize: 28, fontFamily: fonts.h1, color: colors.text },
  price: { fontSize: 20, fontFamily: fonts.h2, color: colors.primary },
  description: { fontSize: 16, fontFamily: fonts.p, color: colors.textMuted, lineHeight: 24 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: colors.card, fontSize: 16, fontFamily: fonts.h2 },
});