import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Test on AuthauthReducer', () => {
    
    test('should make login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Manny Alvarez'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Manny Alvarez'
        })
        
    })

    test('should make logout', () => {

        const initState = {
            uid: 'jaghdsf127362718',
            name: 'Manny Alvarez'
        };

        const action = {
            type: types.logout,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
 
    })

    test('should not make change on state', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Manny Alvarez'
        };

        const action = {
            type: 'asdjkasd',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
 
    })
    

})