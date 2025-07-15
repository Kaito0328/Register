import { BaseText } from '@/base/BaseText';
import { BaseView } from '@/base/BaseView';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <BaseView style={styles.container}>
        <BaseText >This screen does not exist.</BaseText>
        <Link href="/" style={styles.link}>
          <BaseText >Go to home screen!</BaseText>
        </Link>
      </BaseView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
