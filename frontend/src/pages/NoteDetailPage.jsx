import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import axiosInstance from "../lib/axios";

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to Fetch Note!");
        console.log("Error Fetching Note: ",error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();

  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note? ")) return;

    try {
        await axiosInstance.delete(`/notes/${id}`);
        toast.success("Note Deleted Successfully!");
        navigate("/");
    } catch (error) {
        console.error("Failed to Delete: ",error);
        toast.error("Failed to Delete Note!");
    }
  }
  const handleUpdate = async () => {
    if (!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content!");
      return;
    }

    setIsSaving(true)

    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to Update: ", error);
      toast.error("Failed to Update");
      
    } finally {
      setIsSaving(false)
    }
  }

  if(isLoading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5"/>
              Back To Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label mb-4">
                  <span className="label-text">Title</span>
                </label><br/>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label mb-4">
                  <span className="label-text">Content</span>
                </label><br/>
                <textarea
                  placeholder="Write Your Note Here!"
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={isSaving} onClick={handleUpdate}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage