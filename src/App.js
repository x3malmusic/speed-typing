import React from "react";

import Character from "./Components/Character/Character";
import getNewQuote from "./helper/getNewQuote";
import { quoteModifier, everythingIsCorrect } from "./helper/isCorrect";

class App extends React.Component {
  state = {
    quote: [],
    input: "",
    counter: 0,
    stopTimer: false,
    timeIsUp: false,
    timerId: {},
  };

  async componentDidMount() {
    this.getNewQuote();
  }

  resetTimer = (timerId, timerControl) => {
    clearInterval(timerId);
    this.setState({
      stopTimer: timerControl,
      counter: 0,
    });
  };

  setTimer = () => {
    this.setState({
      input: "",
    });
    let interval = setInterval(() => {
      const { quote, counter, stopTimer, timeIsUp } = this.state;
      if (timeIsUp || stopTimer) {
        this.resetTimer(interval, false);
        return;
      }
      this.timerTick(counter, interval, quote);
    }, 1000);
    this.setState({
      timerId: interval,
    });
  };

  timerTick = (counter, interval, quote) => {
    this.setState(
      (prevState) => {
        return {
          counter: prevState.counter + 1,
          quote: prevState.quote.map((q, index) => {
            if (counter >= index) {
              return {
                ...q,
                timerClass: "timer",
              };
            } else return q;
          }),
        };
      },
      () => {
        if (counter > quote.length) {
          clearInterval(interval);
          this.setState({
            timeIsUp: true,
          });
        }
      }
    );
  };

  getNewQuote = async () => {
    const quote = await getNewQuote();
    await this.setState(
      {
        quote,
      },
      () => {
        this.setTimer();
      }
    );
  };

  handleInput = async (value) => {
    await this.setState(
      {
        input: value,
      },
      () => {
        this.setClass();
      }
    );
  };

  setClass = () => {
    const { quote, input } = this.state;
    this.setState(
      {
        quote: quoteModifier(quote, input.split("")),
      },
      () => {
        this.isCorrect();
      }
    );
  };

  isCorrect = () => {
    const { quote } = this.state;
    if (everythingIsCorrect(quote)) {
      this.getNewQuote();
      this.setState({
        input: "",
        stopTimer: true,
      });
    }
  };

  retry = () => {
    const { timerId } = this.state;
    this.setState({
      timeIsUp: false,
      stopTimer: false,
    });

    this.resetTimer(timerId, false);
    this.getNewQuote();
  };

  render() {
    const { quote, input, timeIsUp } = this.state;

    return (
      <div className="container">
        {!timeIsUp ? (
          <>
            <div className="quote-display">
              {quote.map((char, index) => (
                <Character
                  char={char.character}
                  key={index}
                  cClass={char.cClass}
                  timerClass={char.timerClass}
                />
              ))}
            </div>
            <textarea
              autoFocus
              onChange={(e) => this.handleInput(e.target.value)}
              value={input}
            ></textarea>
          </>
        ) : (
          <>
            <div className="txt-center">Time is Up :(</div>
            <button onClick={this.retry}>Retry</button>
          </>
        )}
      </div>
    );
  }
}

export default App;
