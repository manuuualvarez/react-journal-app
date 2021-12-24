import { types } from '../../types/types';


describe('Test Types', () => {

    test('should have this types', () => {


        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            notesAddNew: '[Notes] Add New',
            notesActive: '[Notes] Set Active Notes',
            notesLoad : '[Notes] Load',
            notesupdated : '[Notes] Updated',
            notesFileUrl : '[Notes] Update image url',
            notesRemove: '[Notes] Remove',
            notesLogoutCleaning: '[Notes] Logout cleaning',

        })
        
    })
    
})