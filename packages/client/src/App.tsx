import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import Navbar from "./Navbar";

import "./index.scss";

const client = new QueryClient();

const AppContent = () => {

  const getMessages = trpc.useQuery(["getMessages"]);
  const addMessage = trpc.useMutation(["addMessage"]);
  const onAdd = () => {
    addMessage.mutate({
      message: "Hello World",
      user: "Jack",
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["getMessages"])
      }
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-10 text-3xl mx-auto max-w-6xl">
        <h1 className="text-white mb-5">Todays Chat</h1>
        <div className="grid gap-4 max-h-80 overflow-auto">
          {getMessages.data?.map(x =>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 p-5">
              <div className="bg-gray-500 text-blue-200 text-lg font-bold text-left p-2 rounded-lg">{x.user}</div>
              <div className="bg-gray-700 text-blue-200 text-lg font-bold text-left p-5 rounded-lg col-span-6">{x.message}</div>
            </div>)}

        </div>
        <div className="grid gap-4 max-height-100 max-h-80 overflow-auto">

          <div className="mt-5 text-blue-200 text-lg font-bold text-left p-2 rounded-lg">

            <button className="float-right text-lg bg-yellow-500" onClick={onAdd}>Add Message</button>
          </div>
        </div>

      </div>
    </>
  )
};

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));