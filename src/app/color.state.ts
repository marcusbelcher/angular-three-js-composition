import { State, Action, StateContext, Selector } from '@ngxs/store';

export class SetHex {
    static type = 'SetHex';
    constructor(public readonly payload: string) { }
}

export class ColorStateModel {
    hex: string;
}

@State<ColorStateModel>({
    name: 'color',
    defaults: {
       hex: '#FFFFFF'
    }
})
export class ColorState {
    @Selector()
    static getHex(state: ColorStateModel) {
        return state.hex;
    }

    @Action(SetHex)
    setHue({ getState, patchState }: StateContext<ColorStateModel>, { payload }: SetHex) {
        const state = getState();
        patchState({
            hex: payload
        })
    }
}
