import React, { useState } from 'react';
import Api, { GeneratedType } from '../../util/api';
import { RouteComponentProps } from '@reach/router';

interface IndexPageProps extends RouteComponentProps {}
type PageState = {
  data: GeneratedType | {},
  loading: boolean
};

export default function IndexPage(props: IndexPageProps) {
  const [ state, setState ] = useState<PageState>({ 
    loading: false,
    data: {}
  });
  const onClick = () => {
    setState({ loading: true, data: {} });
    Api.generate('curse').then( data => {
      setState({
        loading: false,
        data
      });
    });
  };

  return (
    <div className="flex-center flex1 flex-column">
      <div className="flex generator">
        {state.loading
          ? "Loading..."
          : <button onClick={onClick}>Click to generate a random curse</button>
        }
        {state.data && state.data.text || ''}

      </div>
    </div>
  );
}
