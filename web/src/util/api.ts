const endpoint = process.env.API_ENDPOINT;

export type GeneratedType = {
  text: string,
  name?: string
};

const Api = {
  getTypes: async (): Promise<string[]> => {
    try {
      const resp = await fetch(`${endpoint}/types`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      const json = await resp.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  generate: async (type, seed = ''): Promise<GeneratedType> => {
    try {
      const resp = await fetch(`${endpoint}/generate/${type}${seed}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Api;
