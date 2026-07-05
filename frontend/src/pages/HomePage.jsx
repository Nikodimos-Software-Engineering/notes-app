import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"
import NavBar from "../components/NavBar"
import RateLimitedUI from "../components/RateLimitedUI"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {

  const [isRateLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(()=> {
    const fetchNotes = async () => {
      try{
        const res = await axiosInstance.get("/notes")
        setNotes(res.data);
        setisRateLimited(false);
      } catch (error){
        if(error.response?.status === 429){
          setisRateLimited(true);
        }else{
          toast.error("Failed to Load Notes");
        }
      } finally {
        setisLoading(false)
      }
    };

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-5xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-center text-primary py-10">Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage