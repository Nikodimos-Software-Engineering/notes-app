import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"
import NavBar from "../components/NavBar"
import RateLimitedUI from "../components/RateLimitedUI"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes")
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Load Notes");
        }
      } finally {
        setIsLoading(false)
      }
    };

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <NavBar />
      
      {isRateLimited && <RateLimitedUI />}
      
      <div className="max-w-5xl mx-auto p-4 mt-6">
        {/* Show loading state while fetching notes */}
        {isLoading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {/* Only show content after loading is complete and not rate limited */}
        {!isLoading && !isRateLimited && (
          <>
            {notes.length === 0 && <NotesNotFound />}
            
            {notes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage