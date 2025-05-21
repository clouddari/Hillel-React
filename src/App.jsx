import "./App.css";
import React from "react"; 



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: {
        heart: 0,
        paw: 0,
        spider: 0,
        alien: 0,
      },
      topEmoji: null,
      cardTextList: [],
    };
  }

  addCounter = (emojiKey) => {
    this.setState(
      (prevState) => {
        const updatedCounters = {
          ...prevState.counters,
          [emojiKey]: prevState.counters[emojiKey] + 1,
        };

        const topEmoji = Object.keys(updatedCounters).reduce((a, b) =>
          updatedCounters[a] > updatedCounters[b] ? a : b
        );

        return {
          counters: updatedCounters,
          topEmoji,
        };
      },
      () => {
        this.fetchBackendData();
      }
    );
  };

  fetchBackendData = async () => {
    const { topEmoji } = this.state;
    if (!topEmoji) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/data?winner=${topEmoji.toUpperCase()}`
      );
      const data = await response.json();
      this.setState({ cardTextList: data.cardText });
    } catch (error) {
      console.error("Error fetching backend data:", error);
    }
  };

  componentDidMount() {
    this.fetchBackendData();
  }

  render() {
    const { topEmoji, counters, cardTextList } = this.state;
    const emojiIcons = {
      heart: "❤️",
      paw: "🐾",
      spider: "🕷",
      alien: "👽",
    };

    const winnerData = topEmoji
      ? cardTextList.find((obj) => obj.title === topEmoji.toUpperCase())
      : null;

    return (
      <>
        <ul>
          {Object.entries(emojiIcons).map(([key, icon]) => (
            <li key={key} onClick={() => this.addCounter(key)}>
              {icon} {counters[key]}
            </li>
          ))}
        </ul>

        {topEmoji && (
          <div className="result-card">
            <h2>Most clicked emoji:</h2>
            <p>{emojiIcons[topEmoji]}</p>
            <p>Clicks: {counters[topEmoji]}</p>
          </div>
        )}
        {winnerData && (
          <div className="backend-info">
            <h2>{winnerData.title}</h2>
            <p>{winnerData.content}</p>
          </div>
        )}
      </>
    );
  }
}

export default App;