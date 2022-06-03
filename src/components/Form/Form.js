import React, {useState} from 'react';
import {Axios} from "axios";

const Form = () => {
  const  url= "https://629988f86f8c03a978445903.mockapi.io/students/Create"
  const [data, setData] = useState({
    name : "",
    group: "",
    year: "",
    phone: "",
    email: ""

  })
  function sumbit(e){
    e.preventDefault()
    Axios.post(url,{
      name: data.name,
      group: data.group,
      year: data.year,
      phone: data.phone,
      email: data.email
    })
      .then(res => {
        console.log(res.data)
      })
  }

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }
  return (
  <div className="container margin-bottom">
        <form action="" onSubmit={(e)=> sumbit(e)} >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            > Name
            </label>
            <input
              onChange={(e)=>handle(e)} id="name" value={data.name}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>


          <div className="mb-5">
            <label
              htmlFor="group"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Group
            </label>
            <input
              onChange={(e)=>handle(e)} id="group" value={data.group}
              type="text"
              name="group"
              placeholder="Group"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>


          <div className="mb-5">
            <label
              htmlFor="Year"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Year
            </label>
            <input
              onChange={(e)=>handle(e)} id="year" value={data.year}
              type="data"
              name="year"
              placeholder="Data"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>


          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Phone number
            </label>
            <input
              onChange={(e)=>handle(e)} id="phone" value={data.phone}
              type="text"
              name="phone"
              placeholder="+996"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              onChange={(e)=>handle(e)} id="email" value={data.email}
              type="email"
              name="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Create
            </button>
          </div>
        </form>
  </div>
  );
};

export default Form;