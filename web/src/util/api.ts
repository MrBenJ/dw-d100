const endpoint = process.env.API_ENDPOINT;

type GeneratedType = {
  text: string,
  name?: string
};

const Api = {
  generate: async (type, seed = ''): Promise<GeneratedType> => {
    const resp = await fetch(`${endpoint}/generate/${type}${seed 
      ? `?seed=${seed}`
      : ''
    }`);

    const json = await resp.json();
    return json;
  }
}

export default Api;
