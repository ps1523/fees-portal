// College Data
const collegesData = [
    {
        id: 1,
        name: "Indian Institute of Technology, Mumbai",
        location: "Mumbai",
        type: "Engineering",
        rating: 4.8,
        totalFee: 850000,
        yearlyFee: 212500,
        image: "fas fa-microchip",
        established: 1958,
        accreditation: "NAAC A++",
        courses: ["B.Tech", "M.Tech", "PhD"],
        facilities: ["Library", "Hostel", "Sports Complex", "Lab"],
        feeStructure: {
            admissionFee: 25000,
            tuitionFee: 200000,
            hostelFee: 45000,
            examFee: 5000,
            libraryFee: 3000,
            labFee: 15000,
            miscFee: 7000
        }
    },
    {
        id: 2,
        name: "All India Institute of Medical Sciences",
        location: "Delhi",
        type: "Medical",
        rating: 4.9,
        totalFee: 125000,
        yearlyFee: 25000,
        image: "fas fa-stethoscope",
        established: 1956,
        accreditation: "NAAC A++",
        courses: ["MBBS", "MD", "MS", "PhD"],
        facilities: ["Hospital", "Library", "Hostel", "Research Labs"],
        feeStructure: {
            admissionFee: 5000,
            tuitionFee: 15000,
            hostelFee: 12000,
            examFee: 2000,
            libraryFee: 1000,
            labFee: 8000,
            miscFee: 2000
        }
    },
    {
        id: 3,
        name: "Indian Institute of Management, Bangalore",
        location: "Bangalore",
        type: "Management",
        rating: 4.7,
        totalFee: 2300000,
        yearlyFee: 1150000,
        image: "fas fa-chart-line",
        established: 1973,
        accreditation: "AACSB",
        courses: ["MBA", "PGPM", "Executive MBA"],
        facilities: ["Library", "Hostel", "Computer Lab", "Auditorium"],
        feeStructure: {
            admissionFee: 50000,
            tuitionFee: 1000000,
            hostelFee: 80000,
            examFee: 10000,
            libraryFee: 5000,
            labFee: 25000,
            miscFee: 30000
        }
    },
    {
        id: 4,
        name: "rathinma techical campus",
        location: "ciombatore",
        type: "Management",
        rating: 4.7,
        totalFee: 150000,
        yearlyFee: 1150000,
        image: "fas fa-chart-line",
        established: 2010,
        accreditation: "AACSB",
        courses: ["MBA", "MCA", "Executive MBA"],
        facilities: ["Library", "Hostel", "Computer Lab", "Auditorium"],
        feeStructure: {
            admissionFee: 50000, 
            tuitionFee: 1000000,
            hostelFee: 80000,
            examFee: 10000,
            libraryFee: 5000,
            labFee: 25000,
            miscFee: 30000
        }
    },
    {
        id: 5,
        name: "Delhi University - St. Stephen's College",
        location: "Delhi",
        type: "Arts",
        rating: 4.6,
        totalFee: 150000,
        yearlyFee: 50000,
        image: "fas fa-book",
        established: 1881,
        accreditation: "NAAC A+",
        courses: ["BA", "BSc", "MA", "MSc"],
        facilities: ["Library", "Sports", "Cafeteria", "Labs"],
        feeStructure: {
            admissionFee: 5000,
            tuitionFee: 35000,
            hostelFee: 15000,
            examFee: 2500,
            libraryFee: 2000,
            labFee: 5000,
            miscFee: 3500
        }
    },
    {
        id: 6,
        name: "Jawaharlal Nehru University",
        location: "Delhi",
        type: "Research",
        rating: 4.5,
        totalFee: 95000,
        yearlyFee: 23750,
        image: "fas fa-microscope",
        established: 1969,
        accreditation: "NAAC A++",
        courses: ["MA", "MSc", "MPhil", "PhD"],
        facilities: ["Central Library", "Hostel", "Computer Center", "Sports"],
        feeStructure: {
            admissionFee: 2000,
            tuitionFee: 15000,
            hostelFee: 8000,
            examFee: 1500,
            libraryFee: 1000,
            labFee: 3000,
            miscFee: 2250
        }
    },
    {
        id: 7,
        name: "Indian Institute of Science, Bangalore",
        location: "Bangalore",
        type: "Science",
        rating: 4.9,
        totalFee: 425000,
        yearlyFee: 106250,
        image: "fas fa-atom",
        established: 1909,
        accreditation: "NAAC A++",
        courses: ["MTech", "MSc", "PhD"],
        facilities: ["Research Labs", "Library", "Hostel", "Sports Complex"],
        feeStructure: {
            admissionFee: 10000,
            tuitionFee: 85000,
            hostelFee: 25000,
            examFee: 3000,
            libraryFee: 2000,
            labFee: 12000,
            miscFee: 6250
        }
    },
    {
        id: 8,
        name: "Banaras Hindu University",
        location: "Varanasi",
        type: "Central University",
        rating: 4.4,
        totalFee: 180000,
        yearlyFee: 45000,
        image: "fas fa-university",
        established: 1916,
        accreditation: "NAAC A+",
        courses: ["BA", "BSc", "BTech", "MA", "MSc"],
        facilities: ["Library", "Hostel", "Sports", "Medical Center"],
        feeStructure: {
            admissionFee: 3000,
            tuitionFee: 30000,
            hostelFee: 18000,
            examFee: 2000,
            libraryFee: 1500,
            labFee: 6000,
            miscFee: 4500
        }
    },
    {
        id: 9,
        name: "Manipal Institute of Technology",
        location: "Manipal",
        type: "Engineering",
        rating: 4.3,
        totalFee: 1600000,
        yearlyFee: 400000,
        image: "fas fa-cogs",
        established: 1957,
        accreditation: "NAAC A+",
        courses: ["BTech", "MTech", "MBA"],
        facilities: ["Library", "Hostel", "Lab", "Sports Complex"],
        feeStructure: {
            admissionFee: 25000,
            tuitionFee: 320000,
            hostelFee: 60000,
            examFee: 8000,
            libraryFee: 5000,
            labFee: 20000,
            miscFee: 12000
        }
    },
    {
        id: 10,
        name: "Tata Institute of Social Sciences",
        location: "Mumbai",
        type: "Social Sciences",
        rating: 4.4,
        totalFee: 280000,
        yearlyFee: 140000,
        image: "fas fa-users",
        established: 1936,
        accreditation: "NAAC A++",
        courses: ["MA", "MSW", "PhD"],
        facilities: ["Library", "Hostel", "Research Center", "Auditorium"],
        feeStructure: {
            admissionFee: 10000,
            tuitionFee: 110000,
            hostelFee: 30000,
            examFee: 5000,
            libraryFee: 3000,
            labFee: 8000,
            miscFee: 9000
        }
    },
    {
        id: 11,
        name: "Amity University",
        location: "Noida",
        type: "Private University",
        rating: 4.1,
        totalFee: 720000,
        yearlyFee: 180000,
        image: "fas fa-graduation-cap",
        established: 2005,
        accreditation: "NAAC A+",
        courses: ["BTech", "BBA", "MBA", "LLB"],
        facilities: ["Library", "Hostel", "Sports", "Cafeteria"],
        feeStructure: {
            admissionFee: 15000,
            tuitionFee: 140000,
            hostelFee: 35000,
            examFee: 6000,
            libraryFee: 4000,
            labFee: 12000,
            miscFee: 8000
        }
    },
    {
        id: 12,
        name: "National Institute of Technology, Trichy",
        location: "Tiruchirappalli",
        type: "Engineering",
        rating: 4.6,
        totalFee: 520000,
        yearlyFee: 130000,
        image: "fas fa-microchip",
        established: 1964,
        accreditation: "NAAC A++",
        courses: ["BTech", "MTech", "MBA", "PhD"],
        facilities: ["Library", "Hostel", "Lab", "Sports Complex"],
        feeStructure: {
            admissionFee: 15000,
            tuitionFee: 100000,
            hostelFee: 20000,
            examFee: 3500,
            libraryFee: 2500,
            labFee: 10000,
            miscFee: 6000
        }
    },
    {
        id: 13,
        name: "Christian Medical College",
        location: "Vellore",
        type: "Medical",
        rating: 4.8,
        totalFee: 950000,
        yearlyFee: 190000,
        image: "fas fa-stethoscope",
        established: 1900,
        accreditation: "NAAC A++",
        courses: ["MBBS", "MD", "MS", "BDS"],
        facilities: ["Hospital", "Library", "Hostel", "Research Labs"],
        feeStructure: {
            admissionFee: 50000,
            tuitionFee: 120000,
            hostelFee: 30000,
            examFee: 8000,
            libraryFee: 5000,
            labFee: 25000,
            miscFee: 12000
        }
    }
];

// Filter options
const filterOptions = {
    types: ["All", "Engineering", "Medical", "Management", "Arts", "Science", "Research", "Central University", "Private University", "Social Sciences"],
    locations: ["All", "Mumbai", "Delhi", "Bangalore", "Varanasi", "Manipal", "Noida", "Tiruchirappalli", "Vellore"],
    feeRanges: [
        { label: "All", min: 0, max: Infinity },
        { label: "Under ₹1 Lakh", min: 0, max: 100000 },
        { label: "₹1-5 Lakhs", min: 100000, max: 500000 },
        { label: "₹5-10 Lakhs", min: 500000, max: 1000000 },
        { label: "₹10-20 Lakhs", min: 1000000, max: 2000000 },
        { label: "Above ₹20 Lakhs", min: 2000000, max: Infinity }
    ]
};

// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { collegesData, filterOptions, formatCurrency, generateStars };
}