import React from 'react';

class App extends React.Component {

  state = {
    error: null,
    isLoaded: false,
    items: []
  }

  componentDidMount() {
    console.log("componentDidMount");

    fetch('https://dekpo.herokuapp.com/posts')
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            items: data
          })
          console.log('Fetch success', data)
        },
        error => {
          this.setState({
            error: error
          })
          console.log(error)
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return (
        <div>Oups ERROR</div>
      )
    } else if (!isLoaded) {
      return (
        <div>Chargement toujours en cours...</div>
      )
    } else {
      return (
        items.map(item => (
          <article key={item._id}>
            {
            (() => {
              if (item.img) {
                return(
                  <img src={"https://dekpo.herokuapp.com/posts/" + item.img} alt={item.title} />
                )
              }
            })()
            }
          <h2>{item.title}</h2>
          <p>{item.text}</p>
          </article>
        ))
      )
    }
  }
}

export default App;
