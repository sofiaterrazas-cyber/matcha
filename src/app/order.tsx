import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { products } from '../constants/products';
import { loadOrders, saveOrders } from '../storage/orders';

export default function OrderScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId) || products[0];

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Por favor escribe tu nombre');
      return;
    }

    setError('');
    const orders = await loadOrders();
    const newOrder = {
      id: Date.now().toString(),
      product: product.name,
      price: product.price,
      name: name.trim(),
      date: new Date().toLocaleDateString('es-BO'),
    };

    await saveOrders([newOrder, ...orders]);
    router.push('/order-confirmed');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>¿A nombre de quién hacemos el pedido?</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmar pedido</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'space-between' },
  title: { fontSize: 22, fontFamily: fonts.h1, color: colors.text, marginTop: 20 },
  form: { gap: 8 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.p,
    color: colors.text,
  },
  error: { color: colors.error, fontSize: 14, fontFamily: fonts.p, marginLeft: 4 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: colors.card, fontSize: 16, fontFamily: fonts.h2 },
});