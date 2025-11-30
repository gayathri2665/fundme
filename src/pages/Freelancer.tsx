import React, { useState } from 'react';

const Freelancer = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name || !file) {
      setError('Name and file are required.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    console.log('Submitting freelancer form:', { name, file });

    // TODO: Implement API call to save the form data
    
    // For now, just simulate a successful submission
    setTimeout(() => {
      setLoading(false);
      setSuccess('Profile updated successfully!');
      setName('');
      setFile(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            Freelancer Profile
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Upload Document</label>
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-highlight-button rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-accent hover:bg-secondary-accent disabled:bg-primary-accent/50 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
