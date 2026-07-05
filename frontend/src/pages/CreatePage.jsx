import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react"
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "../lib/axios";

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()){
      toast.error("All Fields are Required");
      return;
    }

    setisLoading(true);

    try {
      await axiosInstance.post("/notes", {title:title, content:content});
      toast.success("Note Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create note: ", error);
      toast.error("Faild to create note!");
      
    } finally {
      setisLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label mb-4">
                    <span className="label-text">Title</span>
                  </label><br/>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label mb-4">
                    <span className="label-text">Content</span>
                  </label><br/>
                  <textarea
                    type="text"
                    placeholder="Write Your Note Here!"
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage