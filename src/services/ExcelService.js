import api from '../helpers/Api';


export const ExcelService = {
    send: async ( req ) => {
        try {
            let  response = await api.patch('/products/updateAll', req );
            return response.data
        }
        catch( error ) {
            console.log('Error:', error);
            return error;
        }
    }
}

export default ExcelService;