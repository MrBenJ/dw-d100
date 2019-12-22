/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import Api from '../../util/api';
import { RouteComponentProps } from '@reach/router';


interface IndexPageProps extends RouteComponentProps {}
type PageState = {
  data?: any, // GeneratedType  // FUCK YOU TYPESCRIPT
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

  const style = css`
    .display {
      height: 200px;
      align-items: center;
      justify-content: center;
    }

    .generate-button {
      outline: none;
      border: none;
      height: 100px;
      width: 200px;
      background-color: hsla(275,100%,50%,1);
      transition: all .3s ease;

      &:hover {
        background-color: hsla(275,100%,60%,1);
        cursor: pointer;
      }
    }
  `;
  
  const onClick = type => () => {
    setState({ ...state, loading: true, data: {} });
    Api.generate(type).then( data => {
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
        setState({...state, types: typeData});
      });
    }
  }, [types]);

  return (
    <div className="flex-center flex1 flex-column" css={style}>
      <div className="flex display">
        {loading
          ? "Loading..."
          : (
            <div className="flex-column display-content">
              {data.name && <h3>{data.name}</h3>}
              <p>{data.text}</p>
            </div>
          )
        }  
      </div>
      <div className="flex generator">
        { types.map( type => {
          return (
            <div key={type} className={`flex generator-type generator-type${type}`}>
              <button className="generate-button" onClick={onClick(type)}>
                {type[0].toUpperCase() + type.slice(1)}
              </button>
              
            </div>
          );
        })

        }
      </div>
    </div>
  );
}
export default IndexPage;
