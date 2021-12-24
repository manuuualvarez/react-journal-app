import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';




cloudinary.config({
    cloud_name: 'dxbaqq6b4',
    api_key: '718854165935841',
    api_secret: 'cEhNNGRVcAnp1jg61HQM89mtcy8'
})


describe('Test fileUpload helper', () => {

    test('debe de cargar un archivo y retornar el URL', async() => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png','');

        cloudinary.v2.api.delete_resources( imageId, {}, ()=> {});
        
    })


    test('should return an error', async () => {
        
        const file = new File([], 'foto.png')
        const url = await fileUpload(file);

        expect(url).toBe(null);

    })
    
});