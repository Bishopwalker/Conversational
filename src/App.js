import './App.css';
import './normalize.css'
        import {useState, useEffect, useRef} from "react";
import * as PropTypes from "prop-types";
import axios  from "axios";



function Avatar(props) {
    return (
        <div className="avatar">
            <div className='message-name'>
        {props.user ? props.user : 'Me'}
            </div>
            <p className='message-content'>
                {props.messages}
            </p>
            {/*<SvgComponent className="avatar-svg" />*/}
        </div>
    );
}


function ChatboxInput(props) {
    return <div className="chatbox-input">


            <textarea value={props.value} className="chatbox-input-textarea"
                      rows="1"
                      placeholder="Type your message here..."
                      onChange={props.onChange}


            >
                </textarea>
        <button className="chatbox-input-button">
            <span className="chatbox-button-span"> {`<<`}  </span>
        </button>


    </div>;
}

ChatboxInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

function SideMenu(props) {
    return <aside className="sidemenu">
        <div className="side-menu-button">
            <span className="side-menu-button-span">+</span>New Chat
        </div>
        <div className="side-menu-button" onClick={props.onClick}>
            <span className="side-menu-button-span">+</span>Clear
        </div>
    </aside>;
}

SideMenu.propTypes = {onClick: PropTypes.func};

function ChatLog(props) {
    return <div className="chat-log">
        <div className="chat-message">
            {/*                   Loop thru inputMessage and for each message create a new avatar element*/
                props.element
            }


        </div>
    </div>;
}

ChatLog.propTypes = {element: PropTypes.arrayOf(PropTypes.any)};

function Response(props) {

    return <p className="response">{props.responses}</p>;
}

Response.propTypes = {strings: PropTypes.arrayOf(PropTypes.string)};

function App() {
  //create a useState to hold the previous value
    const [inputMessage, setInputMessage] = useState([]);
    const [chatLog, setChatLog] = useState('');
const [element, setElement] = useState([]);
    const [response, setResponse] = useState([]);


//store elements in the array
    const addMessage = (message) => {
        setInputMessage(message);
        setChatLog(message);

    }


const handleChange= (event) => {
    event.preventDefault();
   const value = event.target.value;
 addMessage([value]);

}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hit')
    setChatLog('');
    let message = inputMessage.map((message, index) => {
        return <Avatar key={index} messages={message} user={null}/>
    })
    setElement((element) => [...element, message]);
    setInputMessage([]);

}

//     const responseFunction=async()=>{
//     console.log('hit')
//
//             const response = await axios.post('http://localhost:3080', {
//                 message: chatLog
//             });
//             console.log(response);
//
//         setResponse((responses) => [...responses, response.data.message.choices[0].text]);
//     }
// //create a useEffect to collect and display the response from the server
//     useEffect(   () => {
//
//          responseFunction().then(r => console.log(r));
//
//     } , []);


const clearFields = () => {
    setChatLog('');
    setInputMessage([]);
    setElement([]);
}

    //const [inputMessage, setMessages] = useState([]);
  return (

    <div className="App">

        <SideMenu onClick={clearFields}/>
        <form onSubmit={handleSubmit}>
            <section className="chatbox">
                <ChatLog element={element}/>
                <Response responses={response}/>

                <ChatboxInput value={chatLog} onChange={handleChange}/>


            </section>
        </form>
    </div>
  );
}

export default App;
