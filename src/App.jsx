import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import FetchFeedback from "./components/common/FetchFeedback"
import PathologyChatbot from "./components/user/PathologyChatbotPage"
import HomePage from "./components/common/HomePage"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <HomePage/>
      <Analytics />
    </>
  )
}
export default App