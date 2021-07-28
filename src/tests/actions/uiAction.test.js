import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/type";

describe('Pruebas de action UI', () => {
    test('actions sincronas', () => {
        const actionsetError = setError('Ayuda');
        const actionremoveError = removeError();
        const actionstartLoading = startLoading();
        const actionfinishLoading = finishLoading();

        expect(actionsetError).toEqual({
            type:types.uiSetError,
            payload:'Ayuda'
        });
        expect(actionstartLoading).toEqual({
            type: types.uiStartLoading
        });
        expect(actionfinishLoading).toEqual({
            type:types.uiFinishLoading
        });        
        expect(actionremoveError).toEqual({
            type:types.uiRemoveError
        });
    });
});