import { useEffect, useRef, useState } from "react";
import { Appbar } from "../components";
import axios from "axios";
import { URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [rows, setRows] = useState(2);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      axios
        .get(`${URL}/api/v1/user/info`, { withCredentials: true })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
          navigate("/signin");
        });
    };
    getData();
    inputRef.current?.focus();
  }, []);

  const handlePublish = async () => {
    axios
      .post(
        `${URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate(`/blog/${response.data.id}`);
      })
      .catch((response) => {
        console.log(response);
        alert("Error while publishing the blog");
      });
  };

  return (
    <div>
      {/* Top Part */}
      <Appbar />
      {/* Botton Part */}
      <div className="flex flex-col space-y-2 py-6 ml-36">
        <div className="border-l pt-5 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="h-14 text-5xl pl-4 pr-36 py-3 outline-none w-full"
          />
        </div>
        <div>
          <textarea
            name=""
            id=""
            rows={rows}
            cols={20}
            placeholder="Tell your story..."
            value={content}
            className="text-xl outline-none pl-4 pr-36 w-full"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                setRows(rows + 1);
              }
            }}
          ></textarea>
        </div>
        <div>
          <button
            className="bg-green-600 rounded-full px-3 py-1 text-white"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
