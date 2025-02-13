import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Sharma',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rajesh Sharma provides comprehensive medical care with a focus on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'MG Road, Bangalore, Karnataka'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Priya Mehta',
        image: doc2,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Priya Mehta specializes in diagnosing and treating heart diseases with a focus on patient education.',
        fees: 1000,
        address: {
            line1: 'Ashok Nagar',
            line2: 'Andheri West, Mumbai, Maharashtra'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Anil Verma',
        image: doc3,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '8 Years',
        about: 'Dr. Anil Verma is dedicated to treating neurological disorders with advanced diagnostic techniques and personalized patient care.',
        fees: 1200,
        address: {
            line1: 'Sector 22',
            line2: 'Noida, Uttar Pradesh'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. K. Iyer',
        image: doc4,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '6 Years',
        about: 'Dr. K Iyer focuses on skin health, providing expert treatment for acne, eczema, and other dermatological conditions.',
        fees: 800,
        address: {
            line1: 'Anna Salai',
            line2: 'T. Nagar, Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Sneha Kulkarni',
        image: doc5,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. S. Kulkarni is a leading Gynecologist specializing in providing prenatal care and fertility treatments.',
        fees: 1500,
        address: {
            line1: 'Baner Road',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. K. Nair',
        image: doc6,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Gynecology)',
        experience: '9 Years',
        about: 'Dr. K. Nair specializes in women’s health, providing prenatal care, fertility treatments, and menopause management.',
        fees: 700,
        address: {
            line1: 'MG Road',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Amit Joshi',
        image: doc7,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '7 Years',
        about: 'Dr. Amit Joshi focuses on child health, treating newborns to adolescents with utmost care and expertise.',
        fees: 600,
        address: {
            line1: 'Lal Kothi',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Sunil Bansal',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Gynecologist)',
        experience: '5 Years',
        about: 'Dr. Sunil Bansal is an expert in diagnosing and treating disorders related to the ear, nose, and throat.',
        fees: 550,
        address: {
            line1: 'Salt Lake',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. N. Malhotra',
        image: doc9,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. N. Malhotra is an expert in digestive system disorders, treating liver diseases, ulcers, and IBS.',
        fees: 2000,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Nitin Kapoor',
        image: doc10,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '7 Years',
        about: 'Dr. Nitin Kapoor is an expert in digestive system disorders, treating liver diseases, ulcers, and IBS.',
        fees: 1000,
        address: {
            line1: 'Connaught Place',
            line2: 'New Delhi'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. A. Choudhary',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '3 Years',
        about: 'Dr. A. Choudhary is dedicated to treating neurological disorders with advanced diagnostic techniques and personalized patient care.',
        fees: 1300,
        address: {
            line1: 'Sector 15',
            line2: 'Gurgaon, Haryana'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. M. Deshmukh',
        image: doc12,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. M. Deshmukh provides comprehensive medical care with a focus on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 1000,
        address: {
            line1: 'FC Road',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. S. Reddy',
        image: doc13,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '6 Years',
        about: 'Dr. S. Reddy is focuses on child health, treating newborns to adolescents with utmost care and expertise.',
        fees: 750,
        address: {
            line1: 'Jubilee Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. P. Kaur',
        image: doc14,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '9 Years',
        about: 'Dr. P. Kaur is focuses on child health, treating newborns to adolescents with utmost care and expertise.',
        fees: 850,
        address: {
            line1: 'Sector 34',
            line2: 'Chandigarh'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. R. Patil',
        image: doc15,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '3 Years',
        about: 'Dr. R. Patil is an expert in digestive system disorders, treating liver diseases, ulcers, and IBS.',
        fees: 1200,
        address: {
            line1: 'Law College Road',
            line2: 'Pune, Maharashtra'
        }
    },
    // {
    //     _id: 'doc16',
    //     name: 'Dr. S. Agarwal',
    //     image: doc16,
    //     speciality: 'Rheumatologist',
    //     degree: 'MBBS, DM (Rheumatology)',
    //     experience: '7 Years',
    //     about: 'Dr. Seema Agarwal specializes in treating arthritis, lupus, and other autoimmune disorders.',
    //     fees: 950,
    //     address: {
    //         line1: 'Alkapuri',
    //         line2: 'Vadodara, Gujarat'
    //     }
    // },
    // {
    //     _id: 'doc17',
    //     name: 'Dr. H. Nair',
    //     image: 'doc17',
    //     speciality: 'Urologist',
    //     degree: 'MBBS, MCh (Urology)',
    //     experience: '10 Years',
    //     about: 'Dr. Harshad Nair is an expert in treating urinary tract infections, kidney stones, and male reproductive issues.',
    //     fees: 1100,
    //     address: {
    //         line1: 'Marine Drive',
    //         line2: 'Mumbai, Maharashtra'
    //     }
    // },
    // {
    //     _id: 'doc18',
    //     name: 'Dr. Anjali Bhardwaj',
    //     image: 'doc18',
    //     speciality: 'Hematologist',
    //     degree: 'MBBS, DM (Hematology)',
    //     experience: '6 Years',
    //     about: 'Dr. Anjali Bhardwaj specializes in blood disorders, treating anemia, leukemia, and clotting issues.',
    //     fees: 1050,
    //     address: {
    //         line1: 'Civil Lines',
    //         line2: 'Lucknow, Uttar Pradesh'
    //     }
    // },
    // {
    //     _id: 'doc19',
    //     name: 'Dr. Kunal Singh',
    //     image: 'doc19',
    //     speciality: 'Plastic Surgeon',
    //     degree: 'MBBS, MCh (Plastic Surgery)',
    //     experience: '14 Years',
    //     about: 'Dr. Kunal Singh is a renowned plastic surgeon specializing in cosmetic and reconstructive surgery.',
    //     fees: 2500,
    //     address: {
    //         line1: 'MG Road',
    //         line2: 'Bangalore, Karnataka'
    //     }
    // },
    // {
    //     _id: 'doc20',
    //     name: 'Dr. Shweta Malhotra',
    //     image: 'doc20',
    //     speciality: 'Psychologist',
    //     degree: 'PhD (Clinical Psychology)',
    //     experience: '8 Years',
    //     about: 'Dr. Shweta Malhotra provides mental health counseling, focusing on anxiety, depression, and stress management.',
    //     fees: 700,
    //     address: {
    //         line1: 'Connaught Place',
    //         line2: 'New Delhi'
    //     }
    // }
];

    