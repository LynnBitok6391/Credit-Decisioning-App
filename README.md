# HEVA Credit Decision System

A comprehensive AI-powered credit decisioning platform that leverages advanced analytics and machine learning to assess loan eligibility, manage risk, and streamline the loan application process.

## 🌟 Overview

HEVA is a modern web-based credit decisioning system designed to provide intelligent loan assessment through:
- AI-powered credit scoring algorithms
- Real-time risk assessment and fraud detection
- Comprehensive data management and analytics
- User-friendly interface for both applicants and administrators
- Secure authentication and authorization system

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend
- **Framework**: Spring Boot 3.3.2 (Java 17)
- **Security**: Spring Security with JWT authentication
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate
- **Validation**: Bean Validation
- **API Documentation**: OpenAPI/Swagger

### AI Integration
- **Service**: Google Gemini AI for intelligent chatbot
- **Language**: Node.js/Express backend
- **Rate Limiting**: Custom middleware for API protection

## 🏗 Architecture

```
HEVA/
├── frontend/          # React TypeScript frontend
├── backend/           # Spring Boot Java backend
├── Ai_backend/        # Node.js AI chatbot service
├── backend/creditdecisionapplication/ # Main application structure
│   ├── frontend/      # React application
│   ├── backend/       # Spring Boot application
│   └── package.json   # Root package configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ and **npm**
- **Java** 17+ (OpenJDK recommended)
- **MySQL** 8.0+
- **Maven** 3.6+ (comes with Spring Boot)

### Database Setup

1. **Create MySQL Database**
```sql
CREATE DATABASE credit_decision_db;
```

2. **Update Database Configuration**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Installation Steps

#### 1. Clone the Repository
```bash
git clone [repository-url]
cd HEVA
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run

# For Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. AI Chatbot Service (Optional)
```bash
# Navigate to AI backend
cd Ai_backend

# Install dependencies
npm install

# Start the service
npm start
```

### Environment Variables

Create `.env` files for sensitive configurations:

#### Frontend (.env)
```
VITE_API_URL=http://localhost:8080
VITE_AI_CHAT_URL=http://localhost:3001
```

#### Backend (application.properties)
```
# Already configured in application.properties
# Update database credentials as needed
```

#### AI Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `./mvnw spring-boot:run` - Start Spring Boot application
- `./mvnw test` - Run tests
- `./mvnw clean install` - Clean and build

**AI Backend:**
- `npm start` - Start AI chatbot service
- `npm run dev` - Start with nodemon (development)

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

#### Credit Decisions
- `GET /api/credit-decisions` - Get all decisions
- `POST /api/credit-decisions` - Create new decision
- `GET /api/credit-decisions/{id}` - Get specific decision
- `PUT /api/credit-decisions/{id}` - Update decision
- `DELETE /api/credit-decisions/{id}` - Delete decision

#### Data Management
- `GET /api/data-management` - Get all records
- `POST /api/data-management` - Create new record
- `GET /api/data-management/analytics` - Get analytics data

#### AI Chatbot
- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/history` - Get chat history

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Features

### Core Features
- ✅ **Credit Scoring**: Advanced algorithms for credit assessment
- 📊 **Analytics Dashboard**: Real-time data visualization
- 🔍 **Risk Assessment**: Comprehensive risk evaluation
- 🛡️ **Fraud Detection**: AI-powered fraud identification
- 👥 **User Management**: Role-based access control
- 📱 **Responsive Design**: Mobile-friendly interface

### Admin Features
- 📈 **Analytics & Reports**: Detailed performance metrics
- 👤 **User Management**: Admin user controls
- 📝 **Application Review**: Manual override capabilities
- ⚙️ **System Configuration**: Settings management

### User Features
- 🎯 **Loan Applications**: Easy application process
- 📊 **Credit Score Tracking**: Monitor credit health
- 💬 **AI Assistant**: 24/7 support via chatbot
- 📁 **Document Management**: Upload and manage documents

## 🚀 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
./mvnw clean package
java -jar target/creditdecisionapplication-0.0.1-SNAPSHOT.jar
```

### Docker Deployment (Coming Soon)
```bash
docker-compose up -d
```

## 📚 Documentation

- [API Documentation](http://localhost:8080/swagger-ui.html) (when running locally)
- [Frontend Guide](./frontend/README.md)
- [Backend Guide](./backend/README.md)
- [AI Service Guide](./Ai_backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 8080 (Unix/Mac)
lsof -ti:8080 | xargs kill -9

# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Database Connection Issues**
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify database exists

**CORS Issues**
- Ensure frontend and backend URLs match configuration
- Check environment variables

## 📞 Support

For support, email [support@heva.com] or join our Slack channel.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React community for frontend tools
- Google for Gemini AI integration
- All contributors and testers

---

**Built with ❤️ by the HEVA Team**
