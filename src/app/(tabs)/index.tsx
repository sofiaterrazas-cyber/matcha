import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { products } from '../../constants/products';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Matcha</Text>
        <Text style={styles.title}>¿Qué vas a tomar hoy?</Text>

        <View style={styles.list}>
          {products.map((product, index) => (
            <Animated.View key={product.id} entering={FadeInDown.delay(index * 100)}>
              <Link href={{ pathname: '/product/[id]', params: { id: product.id } }} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Animated.View
                      style={[
                        styles.card,
                        {
                          transform: [{ scale: pressed ? 0.96 : 1 }],
                          transitionProperty: 'transform',
                          transitionDuration: 150,
                        },
                      ]}
                    >
                      <Image source={product.image} style={styles.cardImage} />
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardName}>{product.name}</Text>
                        <Text style={styles.cardPrice}>Bs {product.price}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                    </Animated.View>
                  )}
                </Pressable>
              </Link>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, gap: 16 },
  headerTitle: { fontSize: 18, fontFamily: fonts.h1, color: colors.text },
  title: { fontSize: 24, fontFamily: fonts.h1, color: colors.text, marginBottom: 8 },
  list: { gap: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 24,
    gap: 16,
  },
  cardImage: { width: 64, height: 64, borderRadius: 16 },
  cardInfo: { flex: 1, gap: 4 },
  cardName: { fontSize: 18, fontFamily: fonts.h2, color: colors.text },
  cardPrice: { fontSize: 14, fontFamily: fonts.p, color: colors.textMuted },
});