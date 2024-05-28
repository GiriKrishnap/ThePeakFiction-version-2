import axios from '../util/axios'
//------------------------------
const configToken = {
    headers: {
        "Content-Type": "application/json",
    }
}

//.....................................................................

export const getRandomNovelAPI = () => axios.get('/get-random', configToken);
export const adminGetAllGenreAPI = () => axios.get('/admin/get-all-genres', configToken);
export const adminGetAllNovelsAPI = () => axios.get('/admin/admin-novels', configToken);
export const adminGetAllAuthorsAPI = () => axios.get('/admin/get-all-authors', configToken);
export const adminGetAllUsersAPI = () => axios.get('/admin/get-all-users', configToken);
export const getDashboardDataAPI = () => axios.get('/admin/admin-dashboard', configToken);

export const createGenresAPI = (body) => axios.post('/admin/add-genre', body, configToken);
export const adminNovelHideAPI = (body) => axios.post('/admin/hide-novel', body, configToken);
export const adminNovelApproveAPI = (body) => axios.post('/admin/approve', body, configToken);
export const adminNovelRejectAPI = (body) => axios.post('/admin/reject', body, configToken);
export const adminBlockUserAPI = (body) => axios.post('/admin/block-user', body, configToken);
export const adminListGenreAPI = (body) => axios.post('/admin/list-genre', body, configToken);
export const adminEditGenreAPI = (body) => axios.post("/admin/edit-genre", body, configToken);
