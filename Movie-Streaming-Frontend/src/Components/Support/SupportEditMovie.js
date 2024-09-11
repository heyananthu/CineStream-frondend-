import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../../Assets/Images/complaintBanner.png';
import { imageUrl } from '../Constants/Image_Url';
import { toast } from 'react-toastify';

function SupportEditMovie() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isToastVisible, setToastVisible] = useState(false);
  const [movieData, setMovieData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    director: '',
    scriptWriter: '',
    duration: '',
    releaseDate: '',
    description: '',
    language: '',
    thumbnail: null,
    video: null,
    adults: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    genre: '',
    director: '',
    scriptWriter: '',
    duration: '',
    releaseDate: '',
    description: '',
    language: '',
    thumbnail: '',
    video: '',
    adults: '',
  });

  useEffect(() => {
    if (localStorage.getItem('supportId') == null) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance.post(`/getMovieById/${id}`)
      .then(response => {
        if (response.data.status === 200) {
          const fetchedMovieData = response.data.data;
          const formattedReleaseDate = fetchedMovieData.releaseDate
            ? new Date(fetchedMovieData.releaseDate).toISOString().split('T')[0]
            : '';
          setMovieData({
            ...fetchedMovieData,
            releaseDate: formattedReleaseDate
          });
        } else {
          alert('Failed to fetch movie data');
        }
      })
      .catch(error => {
        alert('Failed to fetch movie data');
      });
  }, [id]);

  useEffect(() => {
    if (movieData) {
      setFormData({
        name: movieData.name || '',
        genre: movieData.genre || '',
        director: movieData.director || '',
        scriptWriter: movieData.scriptWriter || '',
        duration: movieData.duration || '',
        releaseDate: movieData.releaseDate || '',
        description: movieData.description || '',
        language: movieData.language || '',
        thumbnail: null,
        video: null,
        adults: movieData.adults,
      });
    }
  }, [movieData]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0], // Assuming only one file is selected
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
    setErrors(prevState => ({
      ...prevState,
      [name]: '',
    }));
  };

  function validateField(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return '';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    // Validate each field
    errors.name = validateField('Movie Name', formData.name);
    errors.genre = validateField('Genre', formData.genre);
    errors.director = validateField('Director', formData.director);
    errors.scriptWriter = validateField('Script Writer', formData.scriptWriter);
    errors.duration = validateField('Duration', formData.duration);
    errors.releaseDate = validateField('Release Date', formData.releaseDate);
    errors.description = validateField('Description', formData.description);
    errors.language = validateField('Language', formData.language);
    // errors.adults = validateField('Adults', formData.adults);

    setErrors(errors);

    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    if (formIsValid) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'thumbnail' || key === 'video') {
          if (formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        const res = await axiosMultipartInstance.post(`/updateMovieById/${id}`, formDataToSend);
        if (res.data.status === 200) {
            if (!isToastVisible) {
                setToastVisible(true);
                toast.success("Updated Successfully", {
                  onClose: () => setToastVisible(false),
                });
              }
          navigate('/support_view_movies');
        } else {
            if (!isToastVisible) {
                setToastVisible(true);
                toast.error("Failed to Update", {
                  onClose: () => setToastVisible(false),
                });
              }
        }
      } catch (error) {
        console.error('Error updating movie:', error);
        if (!isToastVisible) {
            setToastVisible(true);
            toast.error("Failed to Update", {
              onClose: () => setToastVisible(false),
            });
          }
      }
    }
  };

  if (!movieData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='mt-5'>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-5'>
              <div>
                <p className='user_add_complaint_title'>
                  Contribute to Our Library: <br />
                  Edit Movie
                </p>
                <p className='user_add_complaint_sub_title'>
                  Help us expand our collection by adding favorite movies below.
                </p>
              </div>
              <div className='user_add_complaint_box1_img mt-3'>
                <img src={img} alt='Complaint Banner' />
              </div>
            </div>
            <div className='col-7'>
              <div className='user_add_complaint_form'>
                <div className='container'>
                  <form onSubmit={handleSubmit}>
                    <div className='row'>
                      <div className='col-6 user_reg_input_grp'>
                        <input
                          type='text'
                          name='name'
                          placeholder='Movie Name'
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp'>
                        <select
                          name='genre'
                          onChange={handleChange}
                          value={formData.genre}
                        >
                          <option value=''>Genre</option>
                          <option value='Action'>Action Movies</option>
                          <option value='Drama'>Drama Movies</option>
                          <option value='Comedy'>Comedy Movies</option>
                          <option value='Horror'>Horror Movies</option>
                          <option value='Romantic'>Romantic Movies</option>
                          <option value='Documentary'>Documentaries</option>
                        </select>
                        {errors.genre && <span className='text-danger'>{errors.genre}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <input
                          type='text'
                          name='director'
                          placeholder='Director Name'
                          value={formData.director}
                          onChange={handleChange}
                        />
                        {errors.director && <span className='text-danger'>{errors.director}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <input
                          type='text'
                          name='scriptWriter'
                          placeholder='Script Writer Name'
                          value={formData.scriptWriter}
                          onChange={handleChange}
                        />
                        {errors.scriptWriter && <span className='text-danger'>{errors.scriptWriter}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <input
                          type='text'
                          name='language'
                          placeholder='Language'
                          value={formData.language}
                          onChange={handleChange}
                        />
                        {errors.language && <span className='text-danger'>{errors.language}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <select
                          name='adults'
                          onChange={handleChange}
                          value={formData.adults}
                        >
                          <option value=''>Adult</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                        {errors.adults && <span className='text-danger'>{errors.adults}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <label>Movie Thumbnail</label>
                        <input
                          type='file'
                          name='thumbnail'
                          onChange={handleChange}
                        />
                        {errors.thumbnail && <span className='text-danger'>{errors.thumbnail}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <label>Release Date</label>
                        <input
                          type='date'
                          name='releaseDate'
                          value={formData.releaseDate}
                          onChange={handleChange}
                        />
                        {errors.releaseDate && <span className='text-danger'>{errors.releaseDate}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <label>Duration</label>
                        <input
                          type='text'
                          name='duration'
                          placeholder='Duration (HH:MM)'
                          value={formData.duration}
                          onChange={handleChange}
                        />
                        {errors.duration && <span className='text-danger'>{errors.duration}</span>}
                      </div>
                      <div className='col-6 user_reg_input_grp mt-2'>
                        <label>Movie Video</label>
                        <input
                          type='file'
                          name='video'
                          onChange={handleChange}
                        />
                        {errors.video && <span className='text-danger'>{errors.video}</span>}
                      </div>
                      <div className='col-12 user_reg_input_grp mt-2'>
                        <label>Description</label>
                        <textarea
                          name='description'
                          placeholder='Movie Description'
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                        {errors.description && <span className='text-danger'>{errors.description}</span>}
                      </div>
                      <div className='col-12 mt-3'>
                        <button type='submit' className='btn btn-warning'>
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportEditMovie;