import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaSearch, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const handleApplyClick = () => {
    navigate('/login/candidat');

  };

  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid #333',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.1)';
      e.currentTarget.style.borderColor = '#ff6b35';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#333';
    }}>
      
      {/* Gradient accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)'
      }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid #333'
          }}>
            <img
              src={job.logo && job.logo.startsWith("http")
                ? job.logo
                : "https://dummyimage.com/60x60/333/fff.png&text=" + (job.company ? job.company.charAt(0) : 'C')}
              alt={job.logo ? "Logo de l'entreprise" : "Logo par défaut"}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.3rem',
              fontWeight: '600',
              margin: '0 0 5px 0',
              lineHeight: '1.3'
            }}>
              {job.title}
            </h3>
            <p style={{
              color: '#cccccc',
              fontSize: '1rem',
              margin: '0',
              fontWeight: '500'
            }}>
              {job.company}
            </p>
          </div>
        </div>
        
        <span style={{
          background: 'rgba(255, 107, 53, 0.1)',
          color: '#ff6b35',
          padding: '6px 15px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          border: '1px solid rgba(255, 107, 53, 0.3)'
        }}>
          {job.type}
        </span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cccccc' }}>
            <FaMapMarkerAlt style={{ color: '#ff6b35' }} />
            <span>{job.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cccccc' }}>
            <FaBriefcase style={{ color: '#ff6b35' }} />
            <span>{job.experience}</span>
          </div>
        </div>
        
        <p style={{
          color: '#aaaaaa',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          margin: '0 0 15px 0',
          overflow: 'hidden', // Add this to prevent overflow
          display: '-webkit-box',
          WebkitLineClamp: 3, // Number of lines to show
          WebkitBoxOrient: 'vertical',
        }}>
          {job.description}
        </p>
        
        {job.skills && job.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
            {job.skills.map((skill, index) => (
              <span key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{
          color: '#ff6b35',
          fontSize: '1.2rem',
          fontWeight: '700'
        }}>
          {job.salary}
        </strong>
        
        <button 
          onClick={handleApplyClick}
          style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 107, 53, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Postuler
        </button>
      </div>
    </div>
  );
};

function JobCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
  const [filteredJobs, setFilteredJobs] = useState([]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastJob = currentPage * jobsPerPage;

  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

   
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedPoste, setSelectedPoste] = useState('');
  const [selectedLieu, setSelectedLieu] = useState('');
  const [selectedSalaire, setSelectedSalaire] = useState('');
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/je`)
    .then(response => {
        const updatedJobs = response.data.map(job => ({
          ...job,
          logo: job.logo && job.logo.startsWith("http")
            ? job.logo
            : "https://dummyimage.com/80x80/000/fff.png&text=No+Logo"
        }));
        setJobs(updatedJobs);
        setFilteredJobs(updatedJobs);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des offres :", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const results = jobs.filter(job =>
      (selectedPoste === '' || job.title.toLowerCase().includes(selectedPoste.toLowerCase())) &&
      (selectedLieu === '' || job.location.toLowerCase().includes(selectedLieu.toLowerCase())) &&
      (selectedSalaire === '' || job.salary.toLowerCase().includes(selectedSalaire.toLowerCase())) &&
      (selectedDomaine === '' || job.type.toLowerCase().includes(selectedDomaine.toLowerCase()))
      (
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredJobs(results);
    setCurrentPage(1);
  };

  if (loading) return <p>Chargement des offres...</p>;
  if (error) return <p>Erreur de chargement des offres. Vérifiez le backend.</p>;

  return (
    <>
    {/* Search Section */}
    <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
          border: '1px solid #333',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '40px'
        }}>
      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '25px' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#ff6b35',
              fontSize: '1.1rem'
            }} />
            <input
              type="text"
              placeholder="Rechercher une offre d'emploi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px 15px 50px',
                borderRadius: '25px',
                border: '1px solid #444',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b35';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#cccccc',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Poste
              </label>
              <select 
                value={selectedPoste} 
                onChange={(e) => setSelectedPoste(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                <option value="">Tous les postes</option>
                {[...new Set(jobs.map(job => job.title))].map((poste, index) => (
                  <option key={index} value={poste}>{poste}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#cccccc',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Lieu
              </label>
              <select 
                value={selectedLieu} 
                onChange={(e) => setSelectedLieu(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                <option value="">Toutes les villes</option>
                {[...new Set(jobs.map(job => job.location))].map((lieu, index) => (
                  <option key={index} value={lieu}>{lieu}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#cccccc',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Salaire
              </label>
              <select 
                value={selectedSalaire} 
                onChange={(e) => setSelectedSalaire(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                <option value="">Tous les salaires</option>
                {[...new Set(jobs.map(job => job.salary))].map((salaire, index) => (
                  <option key={index} value={salaire}>{salaire}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#cccccc',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Type
              </label>
              <select 
                value={selectedDomaine} 
                onChange={(e) => setSelectedDomaine(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                <option value="">Tous les types</option>
                {[...new Set(jobs.map(job => job.type))].map((domaine, index) => (
                  <option key={index} value={domaine}>{domaine}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleSearch}
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaFilter />
              Rechercher
            </button>
          </div>
        </div>

      {/* Job Cards Display */}
      <div className="offers-wrapper">
        {filteredJobs.length === 0 ? (
          <p className="empty-message">Aucune offre disponible pour le moment.</p>
        ) : (
          <div className="offers-grid">
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        )}
      </div>
      <div
  className="pagination"
  style={{
    display: 'flex',
    gap: '0.25rem',
    marginTop: '1rem',
    justifyContent: 'center',
  }}
>
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    style={{
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      border: '1px solid #ccc',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      width:'70px',
      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
      opacity: currentPage === 1 ? 0.6 : 1,
    }}
  >
    Précédent
  </button>

  {[...Array(totalPages)].map((_, idx) => (
    <button
      key={idx}
      onClick={() => paginate(idx + 1)}
      style={{
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        border: '1px solid #ccc',
        backgroundColor: currentPage === idx + 1 ? '#007bff' : '#f8f9fa',
        color: currentPage === idx + 1 ? 'white' : 'black',
        borderRadius: '4px',
        width:'70px',
        cursor: 'pointer',
      }}
    >
      {idx + 1}
    </button>
  ))}

  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={{
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      border: 'none',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      width:'70px',
      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
      opacity: currentPage === totalPages ? 0.6 : 1,
    }}
  >
    Suivant
  </button>
</div>

    </>
  );
}

export default JobCards;