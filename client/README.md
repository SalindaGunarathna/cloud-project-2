# ShopHub - Online Shopping Client

A beautiful, modern React-based client application for the Online Shopping Microservices backend.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **User Authentication**: Secure login/registration system
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order history and status
- **User Profile**: Manage account information and preferences
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Live cart and wishlist updates

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Styled Components
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React Hot Toast
- **Data Fetching**: React Query
- **Build Tool**: Create React App

## 📁 Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Site footer
│   │   └── ProtectedRoute.js  # Auth protection
│   ├── contexts/
│   │   ├── AuthContext.js     # Authentication state
│   │   └── CartContext.js     # Shopping cart state
│   ├── pages/
│   │   ├── Home.js            # Landing page
│   │   ├── Products.js        # Product listing
│   │   ├── ProductDetail.js   # Individual product view
│   │   ├── Login.js           # User login
│   │   ├── Register.js        # User registration
│   │   ├── Profile.js         # User profile
│   │   ├── Cart.js            # Shopping cart
│   │   ├── Orders.js          # Order history
│   │   └── Wishlist.js        # Saved products
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.js                 # Main application
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend microservices running (see backend setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-ms/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the client directory:
   ```env
   REACT_APP_API_URL=http://localhost:80
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Configuration

The client is configured to communicate with the backend microservices through the nginx proxy. Update the API base URL in `src/services/api.js` if needed:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:80',
  // ... other config
});
```

### Backend Services

Ensure these backend services are running:
- **Customer Service**: Port 8001
- **Products Service**: Port 8002  
- **Shopping Service**: Port 8003
- **Nginx Proxy**: Port 80

## 📱 Available Pages

### Public Pages
- **Home** (`/`): Landing page with featured products
- **Products** (`/products`): Browse all products with filters
- **Product Detail** (`/products/:id`): Individual product information
- **Login** (`/login`): User authentication
- **Register** (`/register`): User registration

### Protected Pages (Requires Authentication)
- **Profile** (`/profile`): Manage account information
- **Cart** (`/cart`): Shopping cart management
- **Orders** (`/orders`): Order history and tracking
- **Wishlist** (`/wishlist`): Saved products

## 🎨 Design Features

### Color Scheme
- **Primary**: Gradient from #667eea to #764ba2
- **Background**: #f8fafc (light gray)
- **Text**: #1e293b (dark slate)
- **Accent**: #667eea (blue)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Hover Effects**: Interactive button and card animations
- **Loading States**: Skeleton loaders and spinners

## 🔐 Authentication

The client uses JWT tokens for authentication:

1. **Login/Register**: Obtain JWT token from backend
2. **Token Storage**: Stored in localStorage
3. **Auto-refresh**: Automatic token validation
4. **Protected Routes**: Redirect to login if unauthorized

## 🛒 Shopping Features

### Cart Management
- Add/remove products
- Quantity adjustment
- Real-time total calculation
- Persistent cart state

### Wishlist
- Save favorite products
- Quick add to cart
- Remove items
- Sync with backend

### Order Tracking
- View order history
- Track order status
- Order details and items

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly mobile interface

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Docker Deployment
```bash
# Build the Docker image
docker build -t shophub-client .

# Run the container
docker run -p 3000:3000 shophub-client
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-api-domain.com
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📊 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Efficient image handling
- **Bundle Optimization**: Minimized bundle size

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Route-level security
- **Input Validation**: Form validation and sanitization
- **HTTPS Ready**: Configured for secure connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the backend documentation
- Review the API endpoints

## 🔄 Updates

Stay updated with the latest changes:
- Watch the repository for updates
- Check the changelog
- Follow the release notes

---

**Built with ❤️ using React and modern web technologies**
