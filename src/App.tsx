import { Aside, About, Home, Customer, FormCustomer, NotFound, CustomerList, UpdateCustomer, Rooms, RoomsList, AddRoom } from "./components/index.ts"
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <main className="flex flex-row">
        <Aside></Aside>
        <section className="w-full h-dvh px-10 py-5 flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="customer" element={<Customer />}>
              <Route index element={<CustomerList />}></Route>
              <Route path="new-customer" element={<FormCustomer />}></Route>
              <Route path="update-customer/:id" element={<UpdateCustomer />}></Route>
            </Route>
            <Route path="rooms" element={<Rooms />}>
              <Route index element={<RoomsList />}></Route>
              <Route path="new-room" element={<AddRoom />}></Route>
            </Route>

            <Route path="about" element={<About />}></Route>

            <Route path="*" element={<NotFound />}></Route>

          </Routes>
        </section>
      </main>
    </>
  )
}

export default App
