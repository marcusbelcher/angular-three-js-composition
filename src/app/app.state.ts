import { ColorStateModel, ColorState } from './color.state';

export interface AppState {
  color: ColorStateModel;
}

export const states = [ColorState];
