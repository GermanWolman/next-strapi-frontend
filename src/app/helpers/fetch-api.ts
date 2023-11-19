import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export const fetchApi = async (
  path: string,
  urlParamsObject = {},
  options = {}
) => {
  try {
    // opciones para la cabecera
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    });

    // concateno el query string al past y llamo al getstrapi url 
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("************************* Error: " + error);
    throw new Error(
      "Error al conectar la api, verifique servidor encendido, params, etc"
    );
  }
};
