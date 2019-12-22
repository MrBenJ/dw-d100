import React, { useState, useEffect } from 'react';
import Api, { GeneratedType } from '../../util/api';
import { RouteComponentProps } from '@reach/router';
import { types } from 'util';

interface IndexPageProps extends RouteComponentProps {}
type PageState = {
  data?: any, // FUCK YOU TYPESCRIPT
  loading: boolean,
  types: string[]
};

const IndexPage: React.FC<IndexPageProps> = () => {
  const [ state, setState ] = useState<PageState>({ 
    loading: false,
    data: {},
    types: []
  });

  const { types, loading, data } = state;
  
  const onClick = () => {
    setState({ ...state, loading: true, data: {} });
    Api.generate('curse').then( data => {
      setState({
        ...state,
        loading: false,
        data
      });
    });
  };

  useEffect((): void => {
    if (types.length === 0) {
      Api.getTypes().then( typeData => {
        console.log(typeData);
        setState({...state, types: typeData});
      });
    }
  }, [types])

  return (
    <div className="flex-center flex1 flex-column">
      <div className="flex generator">
        {loading
          ? "Loading..."
          : <button onClick={onClick}>Click to generate a random curse</button>
        }
        {data && data.text || ''}
      </div>
    </div>
  );
}
export default IndexPage;
