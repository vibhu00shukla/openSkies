# openSkies

A full-stack web application for discovering, reviewing, and sharing camping experiences. OpenSkies allows users to explore campgrounds, leave reviews with ratings, and connect with fellow outdoor enthusiasts.

## Features

- **User Authentication**: Secure registration and login with password hashing using Passport.js
- **Campground Management**: Create, read, update, and delete campground listings
- **Image Upload**: Upload multiple campground images via Cloudinary integration
- **Reviews & Ratings**: Leave detailed reviews with star ratings for campgrounds
- **User Profiles**: Track user-created content and camping history
- **Flash Messages**: Real-time feedback for user actions
- **Responsive Design**: Mobile-friendly interface with EJS templates
- **Input Validation**: Server-side and client-side validation using Joi schemas
- **Error Handling**: Comprehensive error handling with custom error pages

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Passport.js for authentication
- Multer & Cloudinary for image storage
- Helmet for security headers
- Express Validator for input validation

**Frontend:**
- EJS templating engine with ejs-mate
- Bootstrap for responsive styling
- Client-side form validation
- Interactive map visualizations (Mapbox GL JS)

**Database:**
- MongoDB for data persistence
- Mongoose schemas for data modeling

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection)
- Cloudinary account (for image uploads)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vibhu00shukla/openSkies.git
   cd openSkies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   SESSION_SECRET=your_session_secret
   ```

4. **Start the application**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   nodemon app.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
openSkies/
├── app.js                 # Express app configuration
├── middleware.js          # Custom middleware & auth checks
├── package.json           # Project dependencies
├── models/                # Mongoose schemas
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── controllers/           # Request handlers
│   ├── campgroundController.js
│   ├── reviewsController.js
│   └── usersControllers.js
├── routes/                # Express routes
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── views/                 # EJS templates
│   ├── layouts/
│   ├── partials/
│   ├── campgrounds/
│   ├── users/
│   └── error.ejs
├── public/                # Static assets
│   ├── javascripts/
│   └── stylesheets/
├── seeds/                 # Database seeding
│   ├── index.js
│   ├── seedHelpers.js
│   └── cities.js
└── utils/                 # Utility functions
    ├── ExpressError.js
    └── catchAsync.js
```

## Core Features Explained

### Authentication
Users can register and log in securely. Sessions are maintained using Express session middleware with Passport.js integration.

### Campground Management
- **Create**: Users can list new campgrounds with images, pricing, and descriptions
- **Read**: Browse all campgrounds with detailed information
- **Update**: Edit campground details (only by creators)
- **Delete**: Remove listings (only by creators)

### Reviews System
- Leave ratings (1-5 stars) with text reviews
- View all reviews for a campground
- Delete reviews (only by creators)
- Average rating calculation

### Image Management
Multiple images per campground are uploaded to Cloudinary and stored with optimization.

## Database Schema

### User
- Email, username, password (hashed)
- Created campgrounds and reviews references

### Campground
- Title, description, price, location
- Images array (Cloudinary URLs)
- Author reference
- Reviews array reference
- Geometry data for mapping

### Review
- Rating (1-5)
- Review text
- Author reference
- Associated campground reference

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CSRF protection via middleware
- Input validation and sanitization
- Content Security Policy headers via Helmet
- SQL injection and XSS prevention through Mongoose

## Usage

### Creating a Campground
1. Log in to your account
2. Navigate to "New Campground"
3. Fill in details: title, location, price, description
4. Upload images (up to multiple files)
5. Submit to list your campground

### Leaving a Review
1. Visit a campground detail page
2. Scroll to the reviews section
3. Select a star rating
4. Write your review text
5. Submit to post

### Managing Your Content
- Visit your profile to see all your campgrounds and reviews
- Edit or delete your listings from the detail pages

## Error Handling

The application includes comprehensive error handling:
- Custom error pages for 404, 500, and other HTTP errors
- Form validation error messages
- Database operation error handling
- Async error wrapping with try-catch utilities

## Performance Optimizations

- Lazy image loading with Cloudinary
- CSS and JavaScript minification ready
- Database query optimization with Mongoose
- Flash messages for reducing page reloads

## Future Enhancements

- Advanced search and filtering
- Favorites/bookmarking system
- User messaging system
- Social media integration
- Mobile app version
- Payment integration for premium features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Camping with openSkies!** 🏕️⛰️
