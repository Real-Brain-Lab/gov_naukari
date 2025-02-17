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

const jobData =
  [
    {
      "jobId": "GOV2025-001",
      "PostingDate": "2025-02-17",
      "jobTitle": "Gramin Dak Sevak (GDS)",
      "Organization": "India Post",
      "TotalPosts": 21413,
      "posts": ["Gramin Dak Sevak"],
      "eligibility": [
        {
          "education": [
            "10th pass from a recognized board"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-40 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Selection based on merit and marks in 10th standard"
      },
      "notificationDate": "2025-02-10",
      "applicationLastDate": "2025-03-03",
      "applicationFee": "₹100 for General/OBC candidates; No fee for SC/ST/PWD candidates",
      "applicationLink": "https://indiapostgdsonline.gov.in",
      "jobDescription": "Selected candidates will be responsible for postal services in rural areas.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-002",
      "PostingDate": "2025-02-17",
      "jobTitle": "Constable",
      "Organization": "Punjab Police",
      "TotalPosts": 1746,
      "posts": ["Constable"],
      "eligibility": [
        {
          "education": [
            "12th pass from a recognized board"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-28 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test, physical test, and interview"
      },
      "notificationDate": "2025-02-21",
      "applicationLastDate": "2025-03-13",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://punjabpolice.gov.in",
      "jobDescription": "Selected candidates will be responsible for maintaining law and order.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-003",
      "PostingDate": "2025-02-17",
      "jobTitle": "Assistant Lineman",
      "Organization": "Punjab State Power Corporation Limited (PSPCL)",
      "TotalPosts": 2500,
      "posts": ["Assistant Lineman"],
      "eligibility": [
        {
          "education": [
            "ITI in relevant trade"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-37 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and skill test"
      },
      "notificationDate": "2025-02-21",
      "applicationLastDate": "2025-03-13",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://pspcl.in",
      "jobDescription": "Selected candidates will be responsible for power distribution and maintenance.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-004",
      "PostingDate": "2025-02-17",
      "jobTitle": "Junior Court Assistant",
      "Organization": "Supreme Court of India",
      "TotalPosts": 241,
      "posts": ["Junior Court Assistant"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree from a recognized university"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-05",
      "applicationLastDate": "2025-03-08",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://sci.gov.in",
      "jobDescription": "Selected candidates will assist in court-related administrative tasks.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-005",
      "PostingDate": "2025-02-17",
      "jobTitle": "Short Service Commission (SSC) Officer",
      "Organization": "Indian Navy",
      "TotalPosts": 270,
      "posts": ["SSC Officer"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree in relevant discipline"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "19-25 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test, SSB interview, and medical examination"
      },
      "notificationDate": "2025-02-08",
      "applicationLastDate": "2025-02-25",
      "applicationFee": "No fee",
      "applicationLink": "https://joinindiannavy.gov.in",
      "jobDescription": "Selected candidates will serve as officers in the Indian Navy.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-006",
      "PostingDate": "2025-02-17",
      "jobTitle": "Civil Services Examination",
      "Organization": "Union Public Service Commission (UPSC)",
      "TotalPosts": 979,
      "posts": ["Civil Services"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree from a recognized university"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "21-32 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "2025-06-02",
        "examPattern": "Preliminary exam, Main exam, and interview"
      },
      "notificationDate": "2025-02-14",
      "applicationLastDate": "2025-03-06",
      "applicationFee": "₹100 for General/OBC candidates; No fee for SC/ST/PWD candidates",
      "applicationLink": "https://upsc.gov.in",
      "jobDescription": "Selected candidates will be recruited for various administrative services.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-007",
      "PostingDate": "2025-02-17",
      "jobTitle": "Probationary Officer (PO)",
      "Organization": "State Bank of India",
      "TotalPosts": 12345,
      "posts": ["Probationary Officer"],
      "eligibility": [
        {
          "education": [
            "Graduation in any discipline from a recognized university",
            "Minimum 60% marks in graduation",
            "Valid IBPS score"
          ],
          "experience": [
            "No prior experience required",
            "Fresh graduates are welcome to apply"
          ]
        }
      ],
      "ageLimits": "21-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Preliminary exam, Main exam, followed by an interview"
      },
      "notificationDate": "2024-12-26",
      "applicationLastDate": "2025-01-27",
      "applicationFee": "₹750 for General/EWS/OBC candidates; ₹125 for SC/ST/PWD candidates",
      "applicationLink": "https://www.sbi.co.in/careers",
      "jobDescription": "Selected candidates will undergo training and will be responsible for various banking operations.",
      "additionalInfo": "Candidates are advised to regularly check the official website for updates."
    },
    {
      "jobId": "GOV2025-008",
      "PostingDate": "2025-02-17",
      "jobTitle": "Junior Engineer",
      "Organization": "Railway Recruitment Board (RRB)",
      "TotalPosts": 198,
      "posts": ["Junior Engineer"],
      "eligibility": [
        {
          "education": [
            "Diploma in Engineering or B.Tech in relevant discipline"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-33 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Computer Based Test (CBT) and document verification"
      },
      "notificationDate": "2025-02-14",
      "applicationLastDate": "2025-03-21",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://rrbcdg.gov.in",
      "jobDescription": "Selected candidates will be responsible for railway engineering tasks.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-009",
      "PostingDate": "2025-02-17",
      "jobTitle": "Assistant Professor",
      "Organization": "Tripura Public Service Commission (TPSC)",
      "TotalPosts": 201,
      "posts": ["Assistant Professor"],
      "eligibility": [
        {
          "education": [
            "Master's degree in relevant subject with minimum 55% marks",
            "NET/SET qualification"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "21-40 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-14",
      "applicationLastDate": "2025-03-07",
      "applicationFee": "₹200 for General/OBC candidates; ₹150 for SC/ST/PWD candidates",
      "applicationLink": "https://tpsc.tripura.gov.in",
      "jobDescription": "Selected candidates will teach in government colleges.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-010",
      "PostingDate": "2025-02-17",
      "jobTitle": "Staff Nurse",
      "Organization": "National Health Mission (NHM)",
      "TotalPosts": 47,
      "posts": ["Staff Nurse"],
      "eligibility": [
        {
          "education": [
            "B.Sc Nursing or Diploma in Nursing"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "21-35 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-14",
      "applicationLastDate": "2025-03-17",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://nhm.gov.in",
      "jobDescription": "Selected candidates will provide nursing services in government hospitals.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-011",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Research Fellow",
      "Organization": "Indian Council of Agricultural Research (ICAR)",
      "TotalPosts": 150,
      "posts": ["Junior Research Fellow"],
      "eligibility": [
        {
          "education": [
            "Master's degree in relevant subject with minimum 60% marks"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "21-35 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-15",
      "applicationLastDate": "2025-03-10",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://icar.org.in",
      "jobDescription": "Selected candidates will conduct research in agricultural sciences.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-012",
      "PostingDate": "2025-02-18",
      "jobTitle": "Assistant Section Officer",
      "Organization": "Ministry of External Affairs",
      "TotalPosts": 300,
      "posts": ["Assistant Section Officer"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree from a recognized university"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "20-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-16",
      "applicationLastDate": "2025-03-12",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://mea.gov.in",
      "jobDescription": "Selected candidates will assist in administrative tasks in the ministry.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-013",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Engineer (Civil)",
      "Organization": "Central Public Works Department (CPWD)",
      "TotalPosts": 250,
      "posts": ["Junior Engineer (Civil)"],
      "eligibility": [
        {
          "education": [
            "Diploma in Civil Engineering"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-32 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-17",
      "applicationLastDate": "2025-03-15",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://cpwd.gov.in",
      "jobDescription": "Selected candidates will be responsible for civil engineering tasks.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-014",
      "PostingDate": "2025-02-18",
      "jobTitle": "Technical Assistant",
      "Organization": "Indian Space Research Organisation (ISRO)",
      "TotalPosts": 120,
      "posts": ["Technical Assistant"],
      "eligibility": [
        {
          "education": [
            "Diploma in relevant engineering discipline"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-35 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-18",
      "applicationLastDate": "2025-03-20",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://isro.gov.in",
      "jobDescription": "Selected candidates will assist in technical tasks related to space research.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-015",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Accountant",
      "Organization": "Indian Audit and Accounts Department",
      "TotalPosts": 500,
      "posts": ["Junior Accountant"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree in Commerce or relevant field"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-27 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and skill test"
      },
      "notificationDate": "2025-02-19",
      "applicationLastDate": "2025-03-22",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://cag.gov.in",
      "jobDescription": "Selected candidates will handle accounting tasks in government departments.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-016",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Stenographer",
      "Organization": "Supreme Court of India",
      "TotalPosts": 100,
      "posts": ["Junior Stenographer"],
      "eligibility": [
        {
          "education": [
            "12th pass from a recognized board"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-27 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and skill test"
      },
      "notificationDate": "2025-02-20",
      "applicationLastDate": "2025-03-25",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://sci.gov.in",
      "jobDescription": "Selected candidates will assist in stenography tasks in the Supreme Court.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-017",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Translator",
      "Organization": "Ministry of Home Affairs",
      "TotalPosts": 80,
      "posts": ["Junior Translator"],
      "eligibility": [
        {
          "education": [
            "Master's degree in relevant language"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-21",
      "applicationLastDate": "2025-03-28",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://mha.gov.in",
      "jobDescription": "Selected candidates will assist in translation tasks in the ministry.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-018",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Scientific Officer",
      "Organization": "Defence Research and Development Organisation (DRDO)",
      "TotalPosts": 90,
      "posts": ["Junior Scientific Officer"],
      "eligibility": [
        {
          "education": [
            "Master's degree in relevant science discipline"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-22",
      "applicationLastDate": "2025-03-30",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://drdo.gov.in",
      "jobDescription": "Selected candidates will assist in scientific research tasks.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-019",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Librarian",
      "Organization": "University Grants Commission (UGC)",
      "TotalPosts": 60,
      "posts": ["Junior Librarian"],
      "eligibility": [
        {
          "education": [
            "Master's degree in Library Science"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-35 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-23",
      "applicationLastDate": "2025-03-31",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://ugc.ac.in",
      "jobDescription": "Selected candidates will manage library resources in universities.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-020",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Pharmacist",
      "Organization": "Ministry of Health and Family Welfare",
      "TotalPosts": 200,
      "posts": ["Junior Pharmacist"],
      "eligibility": [
        {
          "education": [
            "Diploma in Pharmacy"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-24",
      "applicationLastDate": "2025-04-01",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://mohfw.gov.in",
      "jobDescription": "Selected candidates will assist in pharmacy services in government hospitals.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-021",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Technician",
      "Organization": "Bharat Heavy Electricals Limited (BHEL)",
      "TotalPosts": 300,
      "posts": ["Junior Technician"],
      "eligibility": [
        {
          "education": [
            "ITI in relevant trade"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-27 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and skill test"
      },
      "notificationDate": "2025-02-25",
      "applicationLastDate": "2025-04-05",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://bhel.com",
      "jobDescription": "Selected candidates will assist in technical tasks in BHEL.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-022",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Assistant",
      "Organization": "Indian Railways",
      "TotalPosts": 1000,
      "posts": ["Junior Assistant"],
      "eligibility": [
        {
          "education": [
            "12th pass from a recognized board"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and skill test"
      },
      "notificationDate": "2025-02-26",
      "applicationLastDate": "2025-04-10",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://indianrailways.gov.in",
      "jobDescription": "Selected candidates will assist in administrative tasks in Indian Railways.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-023",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Scientist",
      "Organization": "Council of Scientific and Industrial Research (CSIR)",
      "TotalPosts": 150,
      "posts": ["Junior Scientist"],
      "eligibility": [
        {
          "education": [
            "Ph.D. in relevant science discipline"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-35 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-27",
      "applicationLastDate": "2025-04-15",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://csir.res.in",
      "jobDescription": "Selected candidates will conduct scientific research in CSIR.",
      "additionalInfo": "Candidates must apply online through the official portal."
    },
    {
      "jobId": "GOV2025-024",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Engineer (Mechanical)",
      "Organization": "Indian Oil Corporation Limited (IOCL)",
      "TotalPosts": 200,
      "posts": ["Junior Engineer (Mechanical)"],
      "eligibility": [
        {
          "education": [
            "Diploma in Mechanical Engineering"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-32 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-02-28",
      "applicationLastDate": "2025-04-20",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://iocl.com",
      "jobDescription": "Selected candidates will assist in mechanical engineering tasks in IOCL.",
      "additionalInfo": "Candidates must apply online through the official website."
    },
    {
      "jobId": "GOV2025-025",
      "PostingDate": "2025-02-18",
      "jobTitle": "Junior Architect",
      "Organization": "Central Public Works Department (CPWD)",
      "TotalPosts": 50,
      "posts": ["Junior Architect"],
      "eligibility": [
        {
          "education": [
            "Bachelor's degree in Architecture"
          ],
          "experience": [
            "No prior experience required"
          ]
        }
      ],
      "ageLimits": "18-30 years (relaxations as per government norms)",
      "examinationDetails": {
        "examDate": "To be announced",
        "examPattern": "Written test and interview"
      },
      "notificationDate": "2025-03-01",
      "applicationLastDate": "2025-04-25",
      "applicationFee": "₹500 for General/OBC candidates; ₹250 for SC/ST/PWD candidates",
      "applicationLink": "https://cpwd.gov.in",
      "jobDescription": "Selected candidates will assist in architectural tasks in CPWD.",
      "additionalInfo": "Candidates must apply online through the official portal."
    }
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
          <h1><Link to="/">Gov_Naukari (Now in β)</Link></h1>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const jobsPerPage = 5;

  // Optimize search function
  const filterJobs = useCallback((term) => {
    if (!term.trim()) return jobData;
    
    const searchTerms = term.toLowerCase().split(" ");
    return jobData.filter(job => {
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
    const filtered = filterJobs(searchTerm);
    return filtered.sort((a, b) => 
      new Date(b.PostingDate) - new Date(a.PostingDate)
    );
  }, [searchTerm, filterJobs]);

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
    <Router basename="/gov_naukari">
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
      
      <Footer onToggleTheme={toggleTheme} theme={theme} />
    </Router>
  );
}

export default App;
