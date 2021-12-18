import React, { useState } from "react";

type AutoCompleteAirportProps = {
  type: string,
  suggestions: string[]
}

const AutoCompleteAirport = (props: AutoCompleteAirportProps) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [input, setInput] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    // Filter our suggestions that don't contain the user's input
    const unLinked = props.suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(unLinked);

    setActiveSuggestionIndex(0);
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setFilteredSuggestions([]);

    const userInput = e.target as HTMLElement;
    setInput(userInput.innerText);

    setActiveSuggestionIndex(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.code === "Enter") {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setFilteredSuggestions([]);
    }

    if (e.code === "ArrowDown") {
      activeSuggestionIndex + 1 > filteredSuggestions.length ? setActiveSuggestionIndex(filteredSuggestions.length) : setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }

    if (e.code === "ArrowUp") {
      activeSuggestionIndex - 1 < 0 ? setActiveSuggestionIndex(0) : setActiveSuggestionIndex(activeSuggestionIndex - 1)
    }
  }

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion,index) => {
           let className;
           // Flag the active suggestion with a class
           if (index === activeSuggestionIndex) {
             className = "suggestion-active";
           }
          return (
            <li
              key={suggestion}
              className={className}
              onClick={onClick}
              >
              {suggestion}
            </li>
          )
        })}
      </ul>) : (null)
  }

  return (
    <>
      <label> {props.type}:
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
      </label>
      {input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoCompleteAirport;