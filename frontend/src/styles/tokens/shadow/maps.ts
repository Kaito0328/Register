import { ShadowKey, ShadowViewStyle, ShadowMap } from './types';
import { StyleState } from '@/styles/component';

// 影の具体的なスタイルを定数として定義しておくと、管理がしやすくなります。
const SHADOW_COLOR = '#000000';

const SHADOW_SM: ShadowViewStyle = {
  shadowColor: SHADOW_COLOR,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
  elevation: 1,
};

const SHADOW_MD: ShadowViewStyle = {
  shadowColor: SHADOW_COLOR,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

const SHADOW_LG: ShadowViewStyle = {
  shadowColor: SHADOW_COLOR,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 6,
};

/**
 * アプリケーション全体で利用するシャドウの定義マップ
 */
export const defaultshadowMap: ShadowMap = {
  [ShadowKey.None]: {
    [StyleState.Default]: {},
  },
  [ShadowKey.SM]: {
    [StyleState.Default]: SHADOW_SM,
  },
  [ShadowKey.MD]: {
    // 通常時はMDの影
    [StyleState.Default]: SHADOW_MD,
    // 押下時には、より大きなLGの影を適用して浮き上がったように見せる
    [StyleState.Pressed]: SHADOW_LG,
  },
  [ShadowKey.LG]: {
    [StyleState.Default]: SHADOW_LG,
  },
};