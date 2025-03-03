import { makeApiRequest } from "../auxiliar"

// Obtiene todos los productos desde la API, con parametros, pagina y resultados por pagina
export const getProductsByAPI = async ({ page = 1, perPage = 10, filters = {}, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'get',
        url: `products?page=${page}&per_page=${perPage}&name=${filters.name}&min_price=${filters.minPrice ?? ''}&max_price=${filters.maxPrice ?? ''}&in_stock=${filters.inStock ?? ''}`,
        funcSuccess,
        funcError,
        showNotify: false,
        authorization: true
    });
}

// Crea un nuevo producto desde la API
export const createProductAPI = async ({ requestData, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'post',
        url: 'products/',
        requestData,
        funcSuccess,
        funcError,
        showNotify,
        authorization: true,
        msgError: 'Error al crear el producto',
        msgSuccess: 'Producto creado correctamente'
    });
}

// Edita un producto desde la API
export const editProductAPI = async ({ requestData, productId, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'put',
        url: 'products/' + productId,
        requestData,
        funcSuccess,
        funcError,
        showNotify,
        authorization: true,
        msgError: 'Error al editar el producto',
        msgSuccess: 'Producto editado correctamente'
    });
}

// Obtiene un producto desde la API
export const showProductAPI = async ({ productId, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'get',
        url: 'products/' + productId,
        funcSuccess,
        funcError,
        showNotify: false,
        authorization: true,
    });
}

// Elimina un producto desde la API
export const deleteProductAPI = async ({ showNotify = false, productId, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'delete',
        url: 'products/' + productId,
        funcSuccess,
        funcError,
        showNotify,
        authorization: true,
        msgError: 'Error al eliminar el producto',
        msgSuccess: 'Producto eliminado correctamente'
    });
}
