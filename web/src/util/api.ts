const endpoint = process.env.API_ENDPOINT;

export type GeneratedType = {
  text: string,
  name?: string
};

const Api = {
  generate: async (type, seed = ''): Promise<GeneratedType> => {
    try {
      const resp = await fetch(`${endpoint}/generate/${type}${seed}`, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      console.log(resp);
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Api;
