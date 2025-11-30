import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function FreelancerProfileForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [yearsExperience, setYearsExperience] = useState<number>(0);
  const [coBuildLink, setCoBuildLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!user?.id) {
      setError('User not authenticated. Please log in again.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
    formData.append('subject', 'New FundMeUp Freelancer Profile');
    formData.append('from_name', 'FundMeUp Platform');

    formData.append('User ID', user.id);
    formData.append('Skills', skills.join(', '));
    formData.append('Years of Experience', yearsExperience.toString());
    formData.append('Co-Build Link', coBuildLink || 'N/A');

    if (document) {
      formData.append('Portfolio / CV', document);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Web3Forms error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-lg w-full">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Thank You!
          </h2>
          <p className="text-text-secondary mb-6">
            Your freelancer profile has been successfully submitted.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-primary-accent text-white rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Complete Your Freelancer Profile
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Portfolio / CV
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                {document ? (
                  <FileText className="mx-auto h-12 w-12 text-secondary-accent" />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <label className="block mt-2 cursor-pointer text-primary-accent">
                  {document?.name || 'Upload a file'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentChange}
                  />
                </label>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <div className="flex">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-l-lg"
                  placeholder="React, Node.js, UI/UX"
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="px-4 bg-primary-accent text-white rounded-r-lg"
                >
                  Add
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Co-build */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Co-Build Link (Optional)
              </label>
              <input
                type="url"
                value={coBuildLink}
                onChange={(e) => setCoBuildLink(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary-accent text-white py-3 rounded-lg"
            >
              <Send className="w-5 h-5" />
              {isLoading ? 'Submitting...' : 'Submit Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfileForm;
