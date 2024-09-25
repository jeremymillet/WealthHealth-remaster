
import './App.css'
import UsersContextProvider from './context/UsersContext'
import Router from './Router'


function App() {

  return (
    <UsersContextProvider>
      <Router />
    </UsersContextProvider>
    
  )
}

export default App
