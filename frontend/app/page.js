// // We import components from other files like this
import MyCard from "./components/MyCard";

// In a `page.js` file, we usually call the page function `Home`
export default function Home() {
  return (
    <body>
      <div className="container">
        <div className="todo-app">
          <h2>To-Do List <img src="images/icon.png"></img></h2>
          <div className="row">
            <input type="text" id="input-box" placeholder="Add your text"></input>
            <button>Add</button>
          </div>
          <ul id="list-container">
            {/* <li className="checked">Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li> */}
          </ul>
        </div>        
      </div>
    </body>
  );
}
