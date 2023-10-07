import { useState, useEffect } from "react";

export default function Notes() {
  const [noteContent, setNoteContent] = useState("your note");
  const [notes, setNotes] = useState([]);
  const [onLoad, setOnLoad] = useState(true);
  //componentDidMount
  useEffect(() => {
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((notesList) => {
        setNotes(notesList);
        setOnLoad(false); // Do something with the list of tasks
      })
      .catch((error) => {});
  }, []);
  const handleChange = (e) => {
    setNoteContent(e.target.value);
  };
  const changeNotes = (notes) => {
    setNotes(notes);
  };
  //componentDidUpdate
  /*useEffect(() => {
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((notesList) => {
        changeNotes(notesList); // Do something with the list of tasks
      })
      .catch((error) => {});
  }, [onLoad]);*/

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      text: noteContent
    };
    setOnLoad(true);
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((note) => {
        setOnLoad(false);
      })
      .catch((error) => {});
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((notesList) => {
        setOnLoad(false);
        changeNotes(notesList); // Do something with the list of tasks
      })
      .catch((error) => {});
  };
  const handleReload = () => {
    setOnLoad(true);
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((notesList) => {
        setOnLoad(false);
        changeNotes(notesList); // Do something with the list of tasks
      })
      .catch((error) => {});
    setOnLoad(false);
  }

  const handleClose = (id) => {
    setOnLoad(true);
    fetch(`https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((note) => {
        setOnLoad(false);
        // Do something with deleted task
      })
      .catch((error) => {
        // handle error
      });
    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((notesList) => {
        setOnLoad(false);
        changeNotes(notesList); // Do something with the list of tasks
      })
      .catch((error) => {});
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h1>Notes</h1>
        <button className="btn" onClick={handleReload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
          </svg>
        </button>
      </div>
      <div className="notes-list">
        {onLoad ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : notes ? (
          notes.map((note) => (
            <div id={note.id} className="notes-item">
              <p>{note.text}</p>
              <button
                className="btn close"
                onClick={() => {
                  handleClose(note.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          []
        )}
      </div>
      <div className="notes-constructor">
        <form>
          <label>New note</label>
          <div className="constructor-block">
            <input
              className="new-note__content"
              type="text"
              value={noteContent}
              onChange={handleChange}
            />
            <button
              className="btn sendthis"
              type="submit"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />{" "}
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
