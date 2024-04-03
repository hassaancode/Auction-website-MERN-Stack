import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleAuctionById,
  reset,
  updateSingleAuction,
} from "../store/auction/auctionSlice.js";
import { getAllCategories } from "../store/category/categorySlice.js";
import { getAllCities } from "../store/city/citySlice.js";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAuction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleAuction, isLoading } = useSelector((state) => state.auction);
  const [imgUrl, setImgUrl] = useState(singleAuction?.image || "");
  const imgRef = useRef(null);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  console.log("singleAuction........", singleAuction);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
    dispatch(getSingleAuctionById(id));
  }, [dispatch, id]);

  console.log("categoreik   ", categories);

  const [formData, setFormData] = useState({
    name: singleAuction?.name || "",
    description: singleAuction?.description || "",
    startTime:singleAuction?.startTime ? new Date(singleAuction?.startTime).toISOString().slice(0, 16) : "",
    endTime: singleAuction?.endTime ? new Date(singleAuction?.endTime).toISOString().slice(0, 16) : "",
    category: singleAuction?.category?._id || "",
    location: singleAuction?.location?._id || "",
    startingPrice: parseFloat(singleAuction?.startingPrice) || 0,
  });
console.log(formData, "formData....");
  const handleProductUpload = (e) => {
    e.preventDefault();
    //image data so use new formdata
    const data = new FormData();
    console.log(formData);
    data.append("name", formData.name);
    data.append("startingPrice", formData.startingPrice);
    data.append("category", formData.category);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("location", formData.location);
    data.append("description", formData.description);

    if (imgRef.current.files[0]) {
        data.append("image", imgRef.current.files[0]);
        } else{
          data.append("image", imgUrl);
        }

        //print data
        for (var pair of data.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

     dispatch(updateSingleAuction({data:data, id:id}));
    // toast.success("Auction updated successfully");

    dispatch(reset());
  };

  return (
    <div className=" w-full min-h-screen max-h-[2000px] bg-body-bg ">
      <form
        className="md:flex flex flex-col md:flex-row   gap-3 justify-center min-h-screen "
        onSubmit={handleProductUpload}
      >
        <div className="md:w-[30%]   p-4 rounded-lg mt-10">
          <h1 className="text-white text-2xl font-bold mb-4">Upload Item</h1>

          {imgUrl ? (
            <img
              src={imgUrl}
              alt="upload img"
              onClick={() => imgRef.current.click()}
              className="w-full h-80  mb-4  
                    rounded-lg border-2 border-solid border-red-300  object-contain  cursor-pointer
                    "
            />
          ) : (
            <div
              onClick={() => imgRef.current.click()}
              className="w-full h-80  mb-4
                    rounded-lg border-2 border-solid border-red-300
                    flex items-center justify-center
                    cursor-pointer
                    "
            >
              <p className="text-white">Click to upload</p>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
            ref={imgRef}
          />
        </div>

        <div className="md:w-[50%]   p-7 rounded-lg mt-10 border-2 border-red-500 border-solid  ">
          <div className=" mb-4">
            <label htmlFor="product_name" className="text-white  mb-1">
              Product Name
            </label>
            <input
              required
              id="product_name"
              type="text"
              className="w-full py-3 mt-2 outline-none border-none rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />{" "}
          </div>

          <div className=" mb-4">
            <label htmlFor="category" className="text-white">
              Category
            </label>
            <select
              required
              id="category"
              className="w-full block py-3 mt-2 rounded-lg outline-none border-none"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category} // Set the value attribute to formData.category
            >
              
              {categories.data &&
                categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="md:flex  gap-5 items-center mb-4">
            <div className="w-full">
              <label htmlFor="start_time" className="text-white">
                Start Time
              </label>
              <input
                required
                id="startTime"
                type="datetime-local"
                className="w-full py-3 mt-2 rounded-lg outline-none "
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                value={formData.startTime}
              />
            </div>
            <div className="w-full mt-4 md:mt-0">
              <label htmlFor="end_time" className="text-white">
                End Time
              </label>
              <input
                required
                id="endTime"
                type="datetime-local"
                className="w-full py-3 mt-2 rounded-lg outline-none "
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                value={formData.endTime}
              />
            </div>
          </div>

          <div className="md:flex gap-5 items-center mb-4">
            <div className="w-full">
              <label htmlFor="starting_price" className="text-white">
                Starting Price
              </label>
              <input
                required
                id="starting_price"
                type="number"
                className="w-full py-3 mt-2 outline-none  rounded-lg "
                onChange={(e) =>
                  setFormData({ ...formData, startingPrice: e.target.value })
                }
                value={formData.startingPrice}
              />
            </div>
            <div className="w-full mt-4 md:mt-0">
              <label htmlFor="category" className="text-white">
                Area
              </label>

              <select
                required
                id="category"
                className="w-full  py-3 mt-2 rounded-lg outline-none border-none "
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                value={formData.location}
              >
                {cities.data &&
                  cities.data.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <label htmlFor="description" className="text-white ">
            Description
          </label>
          <textarea
            required
            id="description"
            rows="7"
            className="w-full py-3 mb-4 mt-2 rounded-lg "
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />

          <button
            type="submit"
            className="w-full py-3 my-5 rounded-lg outline-none bg-theme-bg text-white"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAuction;
