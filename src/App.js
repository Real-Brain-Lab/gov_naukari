import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./pages/About";
import "./pages/Terms";
import "./pages/Privacy";
import "./pages/Contact";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const jobData = [
  // ... (same job data)
];

function Header({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    document.body.classList.toggle('menu-open');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-left">
          <h1><Link to="/">GovNakari (Now in β-state)</Link></h1>
        </div>
        
        <div className="nav-center">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/latest" className="nav-link">Latest Jobs</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/results" className="nav-link">Results</Link>
        </div>
        
        <div className="nav-right">
          <a 
            href="https://t.me/govnaukari" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="telegram-link"
          >
            Join Telegram
          </a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link active">Home</Link>
        <Link to="/latest" className="nav-link">Latest Jobs</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
        <Link to="/results" className="nav-link">Results</Link>
        <a 
          href="https://t.me/govjobs" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="telegram-link"
        >
          Join Telegram
        </a>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </header>
  );
}

function Footer({ onToggleTheme, theme }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Use</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Navigation</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/latest" className="footer-link">Latest Jobs</Link>
            <Link to="/categories" className="footer-link">Categories</Link>
            <Link to="/results" className="footer-link">Results</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="footer-links">
            <a href="https://t.me/govjobs" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram</a>
            <a href="/newsletter" className="footer-link">Newsletter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-social">
          <a href="https://twitter.com/yourhandle" aria-label="Twitter">Twitter</a>
          <a href="https://linkedin.com/company/yourcompany" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://github.com/yourrepo" aria-label="GitHub">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

function JobCard({ job, onClick }) {
  const postedDate = new Date(job.PostingDate);
  const deadline = new Date(job.applicationLastDate);
  const isExpiring = (deadline - new Date()) / (1000 * 60 * 60 * 24) <= 7;

  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-left">
        <h2>{job.jobTitle}</h2>
        <p className="job-organization">{job.Organization}</p>
        <p className="job-posts">Total Posts: {job.TotalPosts}</p>
        <div className="job-meta">
          <span className="job-date">Posted: {postedDate.toLocaleDateString()}</span>
          <span className={`job-deadline ${isExpiring ? 'expiring' : ''}`}>
            Last Date: {deadline.toLocaleDateString()}
          </span>
        </div>
        <div className="job-tags">
          {job.posts && job.posts.map((post, idx) => (
            <span key={idx} className="job-tag">{post}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobDetail({ job, onClose }) {
  useEffect(() => {
    document.body.classList.add('detail-open');
    return () => {
      document.body.classList.remove('detail-open');
    };
  }, []);

  return (
    <div className="job-detail-overlay">
      <button className="back-button" onClick={onClose}>←</button>
      <div className="job-detail-content">
        <div className="job-detail-header">
          <h2>{job.jobTitle}</h2>
          <p className="job-organization">{job.Organization}</p>
          <div className="total-posts">Total Vacancies: {job.TotalPosts}</div>
        </div>

        <div className="job-detail-grid">
          <section className="detail-section">
            <h3>Important Dates</h3>
            <div className="dates-info">
              <div>
                <strong>Posted Date:</strong>
                <p>{new Date(job.PostingDate).toLocaleDateString()}</p>
              </div>
              <div>
                <strong>Last Date:</strong>
                <p>{new Date(job.applicationLastDate).toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h3>Age & Eligibility</h3>
            <p><strong>Age Limit:</strong> {job.ageLimits}</p>
            {job.examinationDetails && (
              <div className="exam-details">
                <p><strong>Exam Date:</strong> {job.examinationDetails.examDate}</p>
              </div>
            )}
          </section>

          <section className="detail-section">
            <h3>Exam Pattern</h3>
            {job.examinationDetails && (
              <div className="exam-pattern">
                <p><strong>Pattern:</strong> {job.examinationDetails.examPattern}</p>
                {job.examinationDetails.stages && (
                  <div className="exam-stages">
                    <strong>Stages:</strong>
                    <ul>
                      {job.examinationDetails.stages.map((stage, index) => (
                        <li key={index}>{stage}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="detail-section full-width">
            <h3>Eligibility Requirements</h3>
            {job.eligibility && job.eligibility.map((item, idx) => (
              <div key={idx} className="eligibility-grid">
                <div>
                  <h4>Education Requirements:</h4>
                  <ul>
                    {Array.isArray(item.education) ? item.education.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    )) : <li>{item.education}</li>}
                  </ul>
                </div>
                <div>
                  <h4>Experience Requirements:</h4>
                  <ul>
                    {Array.isArray(item.experience) ? item.experience.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    )) : <li>{item.experience}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className="detail-section full-width">
            <h3>Job Description</h3>
            <p>{job.jobDescription}</p>
            {job.additionalInfo && (
              <div className="additional-info">
                <h4>Additional Information:</h4>
                <p>{job.additionalInfo}</p>
              </div>
            )}
          </section>

          <section className="application-section">
            <div className="application-fee">
              <strong>Application Fee:</strong>
              <p>{job.applicationFee}</p>
            </div>
            <a 
              href={job.applicationLink} 
              className="apply-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

function LatestJobs() {
  return (
    <div className="coming-soon-container">
      <h1>Latest Jobs</h1>
      <div className="coming-soon-content">
        <span className="coming-soon-emoji">🚀</span>
        <h2>Coming Soon!</h2>
        <p>We're working hard to bring you the latest government job opportunities.</p>
        <p>Check back soon for updates!</p>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div className="coming-soon-container">
      <h1>Job Categories</h1>
      <div className="coming-soon-content">
        <span className="coming-soon-emoji">🎯</span>
        <h2>Coming Soon!</h2>
        <p>We're organizing jobs by categories to make your search easier.</p>
        <p>Stay tuned for a better way to find your perfect role!</p>
      </div>
    </div>
  );
}

function Results() {
  return (
    <div className="coming-soon-container">
      <h1>Exam Results</h1>
      <div className="coming-soon-content">
        <span className="coming-soon-emoji">🎉</span>
        <h2>Coming Soon!</h2>
        <p>Soon you'll be able to check various government exam results here.</p>
        <p>We're making it easier to track your success!</p>
      </div>
    </div>
  );
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const jobsPerPage = 5;

  // Fetch jobs once on component mount
  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Optimize search function
  const filterJobs = useCallback((jobs, term) => {
    if (!term.trim()) return jobs;
    
    const searchTerms = term.toLowerCase().split(" ");
    return jobs.filter(job => {
      const searchableText = `
        ${job.jobTitle || ''} 
        ${job.Organization || ''} 
        ${job.posts?.join(" ") || ''} 
        ${job.jobDescription || ''} 
        ${job.eligibility?.[0]?.education?.join(" ") || ''}
      `.toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, []);

  // Get filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    const filtered = filterJobs(jobs, searchTerm);
    return filtered.sort((a, b) => 
      new Date(b.PostingDate) - new Date(a.PostingDate)
    );
  }, [jobs, searchTerm, filterJobs]);

  // Get current page jobs
  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [filteredJobs, currentPage, jobsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Handle search with debounce
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    setCurrentPage(1);
    
    // Clear searching state after a short delay
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search jobs by title, organization, or keywords..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {isSearching && <div className="search-spinner" />}
                {searchTerm && !isSearching && (
                  <div className="search-results-count">
                    Found {filteredJobs.length} results
                  </div>
                )}
              </div>
            </div>

            {currentJobs.map((job) => (
              <JobCard
                key={job.jobId}
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))}

            {filteredJobs.length > 0 && (
              <div className="pagination">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}

            {filteredJobs.length === 0 && searchTerm && (
              <div className="no-results">
                <p>No jobs found matching "{searchTerm}"</p>
              </div>
            )}

            <p className="disclaimer">
              Disclaimer: The content on this website is generated using artificial intelligence and may contain inaccuracies. Please verify all information from official sources before taking any action.
            </p>
          </div>
        } />
        <Route path="/latest" element={<LatestJobs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      {selectedJob && (
        <JobDetail 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)}
        />
      )}
      
      <Footer />
    </Router>
  );
}

export default App;
