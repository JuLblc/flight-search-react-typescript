import styled from 'styled-components';

type ButtonProps = {
  variante:string
  type:string
  printFlightDetails?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
}

export const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props)=>props.variante === 'search' ? 'rgb(67, 163, 230)':'white'};
    color: ${(props)=>props.variante === 'search' ? 'white':'rgb(67, 163, 230)'} ;
    font-family: Roboto Condensed;
    font-size: 1em;
    letter-spacing: 0.3px;
    text-align: center;
    text-decoration: none;
    padding: 5px 15px;
    border: ${(props)=>props.variante === 'search' ? 'none':'1px solid rgb(67, 163, 230)'} ;
    margin: 0 5px;
    `;