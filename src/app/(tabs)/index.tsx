import { router } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { products } from '../../constants/products';

export default function Home() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.brand}>Matcha</Text>
      <Text style={styles.subtitle}>¿Qué vas a tomar hoy?</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>Bs {item.price}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background },
  brand: { fontSize: 28, fontFamily: fonts.h1, color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 16, fontFamily: fonts.p, color: colors.textMuted, marginBottom: 20 },
  list: { gap: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: colors.card,
    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: { width: 64, height: 64, borderRadius: 16, resizeMode: 'contain' },
  cardContent: { flex: 1, marginLeft: 16 },
  cardTitle: { fontSize: 16, fontFamily: fonts.h2, color: colors.text },
  cardPrice: { fontSize: 15, fontFamily: fonts.p, color: colors.primary, marginTop: 4 },
  arrow: { fontSize: 22, color: colors.textMuted },
});