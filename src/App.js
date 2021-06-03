import React, { useEffect, useState } from 'react';

const Like = () => {
  const [count,setCount] = useState(0)
  const [liked,setLike] = useState(false)
  const [display,setDisplay] = useState(true)

  useEffect(()=>{
    if (count>0) console.log(`you liked ${count} times`)
    if (count===20){
      alert("stop")
      setDisplay(false)
    }
  },[count])

  useEffect(()=>{
   if (liked) console.log(`you liked ${liked.toString()} times`)
  },[liked])

  return(
    <>
    <button onClick={()=>setCount(count+1)}>{count} Like </button><br />
    <button onClick={()=>setLike(!liked)}>{liked.toString()} Liked </button>
    </>
  )
}

const Form = ({id}) => {

  const handleSubmit = (e) => {
    e.prenventDefault()
    console.log(e.target.text.value)
    console.log('texte du comment',e.target.text.value)

    fetch('http://localhost:8888/form', {
    method: 'post',
    cors: 'no-cors',
    body: JSON.stringify(e.target.text.value)
  })
  .then(response=>response.json())
  .then(data=>{
    console.log(data)
  })
    e.target.reset()
  }

  return(
    <form onSubmit={(e)=>handleSubmit(e)}>
      <input type="text" name="text"/>
      <input type="hidden" name={id} value={id}/>
      <input type="submit" value="comment"/>
    </form>
  )
}

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
            <p><Like/></p>
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
          <Form id={item._id}/>
          </article>
        ))
      )
    }
  }
}

export default App;
