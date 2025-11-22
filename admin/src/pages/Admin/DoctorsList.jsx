import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  const [openAbout, setOpenAbout] = useState({})

  const toggleAbout = (id) => {
    setOpenAbout((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className="m-6 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item, index) => {
          const isOpen = openAbout[item._id] || false;

          return (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 overflow-hidden"
            >
              {/* Image Holder */}
              <div className="w-full h-80 bg-[#F3F6FF] flex items-center justify-center overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Text Section */}
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>

                {/* About section */}
                <p className="text-sm text-gray-700 mt-2">
                  {isOpen ? item.about : item.about.slice(0, 60) + "..."}
                </p>

                <button
                  className="text-blue-600 text-xs mt-1 font-medium hover:underline"
                  onClick={() => toggleAbout(item._id)}
                >
                  {isOpen ? "Read Less" : "Read More"}
                </button>

                {/* Availability Toggle */}
                <div className="mt-4 flex items-center gap-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                    />
                    <span className="ml-2 text-gray-700 text-sm">
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DoctorsList
