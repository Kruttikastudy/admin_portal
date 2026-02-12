# SSPD EMR - Admin Panel

A modern, premium React web application for managing a medical EMR (Electronic Medical Records) system.

## 🚀 Features

- **Modern UI/UX**: Premium design with gradient effects, smooth animations, and responsive layouts
- **Login System**: Secure login page with animated medical-themed background
- **Dashboard**: Overview of doctors, staff, and patients with statistics cards
- **Doctor Management**: View, search, filter, and add new doctors
- **Multi-tab Forms**: Comprehensive doctor registration with multiple sections
- **Responsive Design**: Fully responsive layout that works on all devices
- **React Router**: Seamless navigation between pages

## 📁 Project Structure

```
Admin_panel/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Layout.css
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   └── Sidebar.css
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Login.css
│   │   ├── Dashboard.jsx       # Dashboard overview
│   │   ├── Dashboard.css
│   │   ├── Doctors.jsx         # Doctors list
│   │   ├── Doctors.css
│   │   ├── AddDoctor.jsx       # Add new doctor form
│   │   ├── AddDoctor.css
│   │   ├── Staff.jsx           # Staff management (coming soon)
│   │   ├── Patients.jsx        # Patient management (coming soon)
│   │   ├── Appointments.jsx    # Appointments (coming soon)
│   │   ├── Schedule.jsx        # Schedule (coming soon)
│   │   ├── Messages.jsx        # Messages (coming soon)
│   │   └── Settings.jsx        # Settings (coming soon)
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles and design system
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design System

The application features a cohesive design system with:

- **Primary Colors**: Blue gradient palette (#1B7A9F, #2A9BC5, #3BADD6)
- **Typography**: Inter font family for modern, clean text
- **Components**: Reusable buttons, cards, tables, and form elements
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Layered shadow system for depth

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`

## 📱 Pages & Features

### Login Page
- Split-screen design with medical ECG animation
- Clean form with username and password fields
- Gradient backgrounds and smooth transitions

### Dashboard
- Statistics cards showing total doctors, staff, and patients
- Active doctors and staff tables
- Pending approvals section
- Responsive grid layout

### Doctors Management
- Search and filter functionality
- Table view with doctor information
- Add new doctor button
- View and Edit actions for each doctor

### Add Doctor Form
- Multi-tab interface:
  - Personal Details (Demographics & Address)
  - Contact Details (Primary, Emergency)
  - Professional Details (Coming soon)
  - Qualification Details (Coming soon)
  - Insurance Details (Coming soon)
- Profile image upload
- Form validation
- Responsive layout

## 🔧 Technologies Used

- **React** (v19.0.0) - UI library
- **React Router DOM** (v7.13.0) - Routing
- **Vite** (v7.3.1) - Build tool
- **CSS3** - Modern styling with gradients, animations
- **Google Fonts (Inter)** - Typography

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- The login currently accepts any username/password for demo purposes
- Several pages are placeholders and marked as "Coming soon"
- Sample data is used throughout the application
- Forms currently log data to console instead of sending to a backend

## 🚀 Future Enhancements

- Backend integration
- User authentication system
- Complete all "Coming soon" pages
- Add search and filter to all list pages
- File upload functionality
- Data persistence
- Role-based access control
- Dark mode toggle

## 👨‍💻 Development

To build for production:
```bash
npm run build
```

To preview production build:
```bash
npm run preview
```

---

**Built with ❤️ using React and Vite**
