import React, { ReactElement, createContext, useContext } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { defaultAppSettings } from '@/types/Settings';
import { ThemeMode } from '@/styles/themeMode';

// ★★★ モックSettingsContextを作成
const MockSettingsContext = createContext({
  isReady: true,
  settings: defaultAppSettings,
  themeMode: ThemeMode.Light,
  updateSettings: jest.fn(),
  updateTheme: jest.fn(),
  resetSettings: jest.fn(),
});

// ★★★ モックNotesContextを作成  
const MockNotesContext = createContext({
  notes: [],
  createNote: jest.fn(),
  findNoteById: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
  isNoteReady: true,
});

const MockSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockSettingsContext.Provider value={{
      isReady: true,
      settings: defaultAppSettings,
      themeMode: ThemeMode.Light,
      updateSettings: jest.fn(),
      updateTheme: jest.fn(),
      resetSettings: jest.fn(),
    }}>
      {children}
    </MockSettingsContext.Provider>
  );
};

const MockNotesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockNotesContext.Provider value={{
      notes: [],
      createNote: jest.fn(),
      findNoteById: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      isNoteReady: true,
    }}>
      {children}
    </MockNotesContext.Provider>
  );
};

// ★★★ 必要なProviderをすべてまとめたラッパーコンポーネントを作成
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockSettingsProvider>
      <MockNotesProvider>
        {children}
      </MockNotesProvider>
    </MockSettingsProvider>
  );
};

// ★★★ testing-libraryのrenderを、自作のProviderでラップする
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// ★★★ testing-libraryからエクスポートされているものを、すべて再エクスポート
export * from '@testing-library/react-native';

// ★★★ render関数だけ、自作のものに上書きしてエクスポート
export { customRender as render };