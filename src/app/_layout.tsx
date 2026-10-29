import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ title: '' }} />
      <Stack.Screen name="order" options={{ title: 'Pedido' }} />
      <Stack.Screen name="order-confirmed" options={{ headerShown: false }} />
    </Stack>
  );
}