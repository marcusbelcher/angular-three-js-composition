import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HSL } from 'three';

export class SetHue {
    static type = 'SetHue';
    constructor(public readonly payload: number) { }
}

export class SetSaturation {
    static type = 'SetSaturation';
    constructor(public readonly payload: number) { }
}

export class SetLightness {
    static type = 'SetLightness';
    constructor(public readonly payload: number) { }
}

export class HSLStateModel implements HSL {
    h: number;
    s: number;
    l: number;
}

@State<HSLStateModel>({
    name: 'hsl',
    defaults: {
        h: 0,
        s: 0,
        l: 0
    }
})
export class HSLState {
    @Selector()
    static getHSL(state: HSLStateModel) {
        return state;
    }

    @Action(SetHue)
    setHue({ getState, patchState }: StateContext<HSLStateModel>, { payload }: SetHue) {
        const state = getState();
        state.h = payload;
        patchState(state);
    }

    @Action(SetSaturation)
    setSaturation({ getState, patchState }: StateContext<HSLStateModel>, { payload }: SetSaturation) {
        const state = getState();
        state.s = payload;
        patchState(state);
    }

    @Action(SetLightness)
    setLightness({ getState, patchState }: StateContext<HSLStateModel>, { payload }: SetLightness) {
        const state = getState();
        state.l = payload;
        patchState(state);
    }
}

export const states = [HSLState];