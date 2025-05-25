// data/projectsData.js
const projectsData = [
  {
    id: 1,
    brief: 'WordPress Development and Website Design',
    category: 'clients',
    client: 'Reia',
    description: 'Reia is building a suite of women’s health products by redesigning lesser known, yet widely used devices to suit the needs of the modern woman. Reia’s first products, a pessary and pessary applicator, treat pelvic organ prolapse. The Reia pessary collapses for insertion and removal, enabling users with any stage of prolapse to insert and remove the pessary on their own. Reia is a small, 4-person company, co-founded and owned by women. The Reia website is a custom WordPress site that I designed and developed. The site is built with a custom theme and features downloadable instructions, a contact form, and a signup form for a monthly newsletter. The site also features a variety of image carousels to show the product and custom slideshows to display large amounts of information in a digestable way. The site is fully responsive and designed to be user-friendly and professional, with a clean and modern aesthetic.',
    technologies: ['WordPress', 'React', 'Adobe Illustrator'],
    link: 'https://reiahealth.com',
    image: 'assets/thumbnails/Reia.svg',
    color: '#cae2eb',
  },
  {
    id: 2,
    brief: 'Squarespace Website Redesign',
    category: 'clients',
    client: 'The Print Shop',
    description: 'The Print Shop is a local screenprint and embroidery shop in Wilbraham, MA. The shop mainly services local schools, businesses, and organizations with custom apparel and promotional products. The Print Shop was started in 1995 and has since grown into a high volume shop and has a team of seasoned printers to ensure top quality prints, no matter the client. The Print Shop had an outdated Squarespace website that the owner thought was largly difficult to navigate. The owner wanted to update the site to be more user-friendly and to highlight the family-run nature of the business. I redesigned the site with a new color scheme, updated fonts, and a simplified navigation. I also updated the quote submission form to allow for image attachments and added a section to highlight the family-run nature of the business.',
    technologies: ['Squarespace', 'Adobe Illustrator'],
    link: 'https://www.printshopma.com/',
    image: 'assets/thumbnails/ThePrintShop.svg',
    color: '#939393',
  },
  {
    id: 3,
    brief: 'Blog Case Study',
    category: 'case studies',
    client: 'SLAB',
    description: 'SLAB is a dynamic platform designed for active individuals, focusing on energy-packed snacks crafted to fuel their adventures. The application empowers users to create, share, and explore unique recipes while connecting with a like-minded community. Users can create personal accounts, upload their own recipes, and browse those shared by others. A favorites feature allows users to save recipes for easy access later.\n\nSLAB is built with a React front-end and a Node.js/Express back-end, utilizing MongoDB as the primary database. Cloudinary is integrated for image storage, while Nodemailer handles password reset emails with secure, tokenized links. The platform is hosted on Render and features a clean, modern design with a fully responsive interface, ensuring a seamless user experience across all devices.',
    listTitle: 'Key Features Include:',
    listItems: [
      'User authentication.',
      'User-generated content, including recipes and comments.',
      'Favorites feature for saving recipes.',
      'Reset password functionality with secure, tokenized links.',
    ],
    listTitle2: 'If you do not want to create an account, you can use the following credentials to view the site:',
    listItems2: [
      'Email: foodCritic@gmail.com',
      'Password: pizzaLover123',
    ],
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Render', 'Cloudinary'],
    link: 'https://slab-euvx.onrender.com/',
    image: 'assets/thumbnails/SLAB-LOGO.svg',
    color: '#2c3e50',      
  },
  {
    id: 4,
    brief: 'E-Commerce Case Study',
    category: 'case studies',
    client: 'Crater',
    description: 'Crater is a modern e-commerce platform designed for browsing and purchasing snowboards and apparel. Built with a React front-end and a Node.js/Express back-end, the platform uses MongoDB as the primary database and Cloudinary for image storage. It is hosted on Render for seamless deployment and reliability.\n\nThe centerpiece of Crater is its robust admin dashboard. The dashboard empowers site owners to efficiently manage their inventory by adding, editing, and deleting products—ideal for small businesses seeking control without relying on developers.',
    listTitle: 'Key Features Include:',
    listItems: [
      'Tracking views of popular products.',
      'Monitoring site visits, with analytics broken down by month and year.',
      'Managing product inventory with ease.',
    ],
    listTitle2: 'To access the admin dashboard, use the following credentials:',
    listItems2: [
      'Username: Crater',
      'Password: Lakewood8484',
    ],
    otherLinks: [
      {
        title: 'Admin Dashboard',
        link: 'https://crater2-0.onrender.com/login',
      },
    ],
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Render', 'Cloudinary'],
    link: 'https://crater2-0.onrender.com/',
    image: 'assets/thumbnails/craterSnnowboards.svg',
    color: '#f5f5f5',
  },
]

export default projectsData;