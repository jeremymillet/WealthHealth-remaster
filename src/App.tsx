
import './App.css'
import LoginContextProvider from './context/LoginContext'
import UsersContextProvider from "./context/UsersContext"
import Router from './Router'


function App() {

  return (
    <LoginContextProvider>
      <UsersContextProvider>
        <Router />
      </UsersContextProvider>
    </LoginContextProvider>
    
  )
}

export default App
