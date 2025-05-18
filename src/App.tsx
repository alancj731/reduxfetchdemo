import "./App.css";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import DataPage from "./pages/dataPage.tsx";

function App() {
  return (
    <Provider store={store}>
        <main className="min-h-screen w-screen flex items-start justify-center bg-gray-100 p-8">
          <div className="p-8 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Data Page</h1>
            <p className="text-gray-700 mb-4">
              This is a simple example of using Redux Toolkit with React.
            </p>
            <DataPage />
          </div>
        </main>
    </Provider>
  );
}

export default App;
