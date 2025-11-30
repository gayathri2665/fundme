import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Adjust path as needed

const PitchDetails = () => {
  const { id } = useParams();
  const [pitch, setPitch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPitch = async () => {
      const { data, error } = await supabase
        .from('pitches')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching pitch:', error);
        setError('Could not fetch pitch details.');
      } else {
        setPitch(data);
      }
    };

    if (id) {
      fetchPitch();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!pitch) {
    return <div className="text-center mt-10">Loading pitch details...</div>;
  }

  // Function to get video ID from YouTube URL
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = pitch.video_link ? getYouTubeID(pitch.video_link) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{pitch.title}</h1>
          <p className="text-lg text-gray-600 mb-6">by <span className="font-semibold">{pitch.founder_name}</span></p>
          
          {videoId && (
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-md"
              ></iframe>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{pitch.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDetails;
