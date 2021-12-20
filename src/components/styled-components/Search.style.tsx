import styled from 'styled-components';

export const StyledSection = styled.section`
    background-color: rgb(25, 33, 41);
    color: white;
    font-size: 1.5em;
    padding-top: 25px;
    padding-bottom: 25px;`

export const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;`

export const StyledWarningMsg = styled.p`
    font-family: Roboto Condensed;
    font-size: 3em;
    text-align: center;
    color: #d0435b;`

export const StyledLabelContainer = styled.div`
    position: relative;`

export const StyledInputAirport = styled.input`
    margin: 0 5px;
    font-family: Roboto Condensed;
    width: 250px;
    font-size: 1em;
    letter-spacing: 0.3px;
    text-align: center;
    padding: 5px 15px;
    border: none;`

// .suggestions {
//     position: absolute;
//     top: 35px;
//     right: 5px;
//     width: 250px;
//     border: 1px solid #999;
//     border-top-width: 0;
//     list-style: none;
//     margin-top: 0;
//     padding-left: 0;
// }

// .suggestions li {
//     padding: 0.5rem;
//     background-color: rgb(25, 33, 41);
//     color: white;
// }

// .suggestion-active,
// .suggestions li:hover {
//     background-color: white;
//     color: rgb(25, 33, 41);
//     cursor: pointer;
//     font-weight: 900;
// }

// .suggestions li:not(:last-of-type) {
//     border-bottom: 1px solid #999;
// }