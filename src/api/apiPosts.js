import apiHandler from './apiHandler';
// import { environment } from '../utils/config';

const { tenantRequest } = apiHandler;

function getPosts({ signal }) {

  const method = 'GET';
  return tenantRequest('/summary', {
    signal,
    method,
  });

}

function getByCountry({ signal, parameters }) {

  const { Country, dateStart, dateEnd } = parameters;
  const method = 'GET';
  return tenantRequest(`/country/${Country}?from=${dateStart}&to=${dateEnd}`, {
    signal,
    method,
  });

}

export default {
  getPosts, getByCountry,
};
