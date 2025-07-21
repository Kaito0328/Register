// Test setup for React Native with Expo
import '@testing-library/jest-native/extend-expect';

// ★★★ 2. AsyncStorageの公式モックをインポート ★★★
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// ★★★ 3. Jestに対して、AsyncStorageが呼ばれたら公式モックを使うように指示 ★★★
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock React Native Settings
jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 812 }),
}));

// Mock SettingsContext hooks
jest.mock('@/contexts/SettingsContext', () => ({
  useSettings: () => ({
    isReady: true,
    settings: {
      theme: 'light',
      defaultLifecycle: {
        type: 'days',
        value: 7
      }
    },
    themeMode: 'light',
    updateSettings: jest.fn(),
    updateTheme: jest.fn(),
    resetSettings: jest.fn(),
  }),
  SettingsProvider: ({ children }) => children,
}));

// Mock NotesContext hooks
jest.mock('@/contexts/NotesContext', () => ({
  useNotes: () => ({
    notes: [],
    createNote: jest.fn(),
    findNoteById: jest.fn(),
    updateNote: jest.fn(),
    deleteNote: jest.fn(),
    isNoteReady: true,
  }),
  NotesProvider: ({ children }) => children,
}));

// Mock expo-router
// ★★★ expo-routerのモック
jest.mock('expo-router', () => {
  const mockReact = require('react');
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    }),
    useLocalSearchParams: () => ({
      id: 'test-note-id',
    }),
    usePathname: () => '/test',
    useFocusEffect: jest.fn((callback) => {
      // すぐに実行する
      if (typeof callback === 'function') {
        callback();
      }
    }),
    Stack: {
      Screen: ({ children }) => children,
    },
    Tabs: {
      Screen: ({ children }) => children,
    },
    Drawer: {
      Screen: ({ children }) => children,
      Navigator: ({ children }) => mockReact.createElement('div', {}, children),
    },
    Link: ({ children, href, ...props }) => mockReact.createElement('a', { href, ...props }, children),
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    },
  };
});

// Global test setup
global.__TEST__ = true;

// Suppress act warnings during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to') &&
      args[0].includes('was not wrapped in act')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Alert のモック
global.Alert = {
  alert: jest.fn((title, message, buttons) => {
    if (buttons && Array.isArray(buttons)) {
      // デフォルトでOKボタンを実行
      const okButton = buttons.find(button => button.text === 'OK' || !button.style);
      if (okButton && okButton.onPress) {
        okButton.onPress();
      }
    }
  }),
};
