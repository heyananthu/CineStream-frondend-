import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imageUrl } from "../Constants/Image_Url";
import axiosInstance from "../Constants/BaseUrl";
import MovieInfo from "./MovieInfo";

function PlayVideo({userType}) {
  const [movieData, setMovieData] = useState({ video: { filename: "" },trailer: { filename: "" } });
  const { id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/getMovieById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          console.log("Failed to fetch movie data:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch movie data:", error);
      });
  }, [id]);

  if (!movieData.video.filename) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="video-player mt-3"> 
        <video
          width="100%"
          controls
          autoPlay
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source
            src={`${imageUrl}/${type=='movie'?movieData.video.filename:movieData.trailer.filename}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <MovieInfo userType={userType} type={type} />
    </div>
  );
}

export default PlayVideo;
