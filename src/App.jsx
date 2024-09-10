import React from "react";
import { useCreatePostMutation, useGetPostsQuery } from "./redux/api";
import Posts from "./components/Posts";
import { useState } from "react";
import SimpleForm from "./SimpleForm";
const App = () => {

  const { isError, isLoading, error, data, isSuccess } = useGetPostsQuery("");
  const [newPost]=useCreatePostMutation();
  console.log(data);
  
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post={
      title:formData.title,
      body:formData.body,

    }
    newPost(post); 
    setFormData({ title: "", body: "" }); // Reset form after submission
  };

  return (

    <>
   <SimpleForm/>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {isSuccess ? <Posts posts={data} /> : <h2> loading</h2>}
    </>
  );
};

export default App;
