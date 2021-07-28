import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dsq6grdaj', 
    api_key: '455461477994279', 
    api_secret: 'KEcWIBJmUCwyxiBOAO5uvgUFKNE' 
  });
describe('Prueba de fileUpload', () => {

    test('debe de cargar un archivo y retornar la url', async () => {
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        
        const blob = await resp.blob();
       
        const file = new File([blob],'goku.png');
       
        const url = await fileUpload(file);
        console.log(url)
        expect(typeof url ).toBe('string');
        //borrar imagen
         const segment = url.split('/');
         const imagenId = segment[segment.length - 1].replace('.png','');

            cloudinary.v2.api.delete_resources(imagenId, {}, ()=>{
             done();
         });
        
    });
    test('debe de cargar un archivo y retornar la url', async() => {
       
        const file = new File([],'goku.png');
       
        const url = await fileUpload(file);
        expect(url ).toBe(null);
        
    });
});