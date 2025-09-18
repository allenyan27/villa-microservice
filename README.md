# Villa Microservice with gRPC

A microservice system for villa management built with TypeScript, Node.js, and gRPC for inter-service communication.

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST     ┌──────────────────┐    gRPC     ┌─────────────────┐
│   Client/App    │ ─────────────► │   API Service    │ ─────────► │  Villa Service  │
└─────────────────┘                 │   (Port 3000)    │             │   (Port 50051)  │
                                    └──────────────────┘             └─────────────────┘
```

- **API Service**: REST API gateway that receives HTTP requests from clients
- **Villa Service**: gRPC microservice that manages villa data
- **Proto**: Protocol Buffer definitions for communication contracts

## 📁 Project Structure

```
project-root/
├─ api-service/
│  ├─ src/
│  │  ├─ controllers/villa.controller.ts    # REST API controllers
│  │  ├─ grpc-client.ts                     # gRPC client wrapper
│  │  └─ server.ts                          # Express server setup
│  ├─ package.json
│  └─ tsconfig.json
├─ villa-service/
│  ├─ src/
│  │  ├─ grpc-server.ts                     # gRPC server implementation
│  │  ├─ models/villa.model.ts              # TypeScript interfaces
│  │  └─ data.ts                            # In-memory data storage
│  ├─ package.json
│  └─ tsconfig.json
├─ proto/
│  └─ villa.proto                           # Protocol Buffer definition
├─ package.json                             # Root package.json
└─ README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. **Clone and install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install villa-service dependencies
   cd villa-service && npm install && cd ..
   
   # Install api-service dependencies
   cd api-service && npm install && cd ..
   ```

### Development

2. **Start Villa Service (gRPC Server):**
   ```bash
   npm run dev:villa
   ```
   Server will run on port `50051`

3. **Start API Service (REST API) - in a new terminal:**
   ```bash
   npm run dev:api
   ```
   Server will run on port `3000`

### Production Build

```bash
# Build all services
npm run build

# Or build individually
npm run build:villa
npm run build:api
```

### Production Start

```bash
# Start villa service
cd villa-service && npm start

# Start api service (new terminal)
cd api-service && npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /health
```

#### Get All Villas
```http
GET /api/villas?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": "uuid-string",
            "name": "Villa Paradise",
            "location": "Bali, Indonesia",
            "price": 1500000,
            "rooms": 4,
            "available": true,
            "description": "Beautiful villa with ocean view"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 3,
        "totalPages": 1
    }
}
```

#### Get Villa by ID
```http
GET /api/villas/{id}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "uuid-string",
        "name": "Villa Paradise",
        "location": "Bali, Indonesia",
        "price": 1500000,
        "rooms": 4,
        "available": true,
        "description": "Beautiful villa with ocean view"
    }
}
```

#### Create Villa
```http
POST /api/villas
Content-Type: application/json

{
    "name": "Villa Sunset",
    "location": "Lombok, Indonesia",
    "price": 1200000,
    "rooms": 3,
    "description": "Cozy villa perfect for family vacation"
}
```

**Required Fields:**
- `name`: string
- `location`: string
- `price`: number
- `rooms`: number

**Optional Fields:**
- `description`: string

#### Update Villa
```http
PUT /api/villas/{id}
Content-Type: application/json

{
    "name": "Updated Villa Name",
    "price": 1800000,
    "available": false
}
```

#### Delete Villa
```http
DELETE /api/villas/{id}
```

## 🧪 Testing

### Manual Testing with cURL

```bash
# Health check
curl http://localhost:3000/health

# Get all villas
curl http://localhost:3000/api/villas

# Get villa by ID
curl http://localhost:3000/api/villas/{villa-id}

# Create new villa
curl -X POST http://localhost:3000/api/villas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Villa Test",
    "location": "Jakarta, Indonesia",
    "price": 2000000,
    "rooms": 5,
    "description": "Test villa"
  }'

# Update villa
curl -X PUT http://localhost:3000/api/villas/{villa-id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 2500000,
    "available": true
  }'

# Delete villa
curl -X DELETE http://localhost:3000/api/villas/{villa-id}
```

### Postman Collection

You can import the following collection for testing:

```json
{
    "info": {
        "name": "Villa Microservice API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Health Check",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}/health",
                    "host": ["{{base_url}}"],
                    "path": ["health"]
                }
            }
        },
        {
            "name": "Get All Villas",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}/api/villas?page=1&limit=10",
                    "host": ["{{base_url}}"],
                    "path": ["api", "villas"],
                    "query": [
                        {"key": "page", "value": "1"},
                        {"key": "limit", "value": "10"}
                    ]
                }
            }
        }
    ],
    "variable": [
        {
            "key": "base_url",
            "value": "http://localhost:3000",
            "type": "string"
        }
    ]
}
```

## 🛠️ Available Scripts

### Root Level
```bash
npm run build          # Build all services
npm run build:api      # Build api service only
npm run build:villa    # Build villa service only
npm run dev:api        # Development api service
npm run dev:villa      # Development villa service
npm run proto:gen      # Generate protobuf for all services
npm run proto:gen:api  # Generate protobuf for api service
npm run proto:gen:villa# Generate protobuf for villa service
```

### Individual Services
```bash
# Villa Service
cd villa-service
npm run build          # Build TypeScript
npm run dev            # Development mode with nodemon
npm start              # Production start
npm run proto:gen      # Generate protobuf

# API Service  
cd api-service
npm run build          # Build TypeScript
npm run dev            # Development mode with nodemon
npm start              # Production start
npm run proto:gen      # Generate protobuf
```

## ⚙️ Configuration

### Environment Variables

**Villa Service (`villa-service/.env`):**
```env
GRPC_PORT=50051
NODE_ENV=development
```

**API Service (`api-service/.env`):**
```env
PORT=3000
VILLA_GRPC_HOST=localhost
VILLA_GRPC_PORT=50051
NODE_ENV=development
```

## 🔧 Technology Stack

- **TypeScript**: Type-safe JavaScript
- **Node.js**: Runtime environment
- **gRPC**: High-performance RPC framework
- **Protocol Buffers**: Serialization protocol
- **Express.js**: Web framework for REST API
- **UUID**: Unique identifier generation
- **Nodemon**: Development file watcher

## 📋 Protocol Buffer Schema

The villa service uses the following schema:

```proto
service VillaService {
    rpc GetVilla (GetVillaRequest) returns (Villa);
    rpc GetAllVillas (GetAllVillasRequest) returns (GetAllVillasResponse);
    rpc CreateVilla (CreateVillaRequest) returns (Villa);
    rpc UpdateVilla (UpdateVillaRequest) returns (Villa);
    rpc DeleteVilla (DeleteVillaRequest) returns (DeleteVillaResponse);
}

message Villa {
    string id = 1;
    string name = 2;
    string location = 3;
    int32 price = 4;
    int32 rooms = 5;
    bool available = 6;
    string description = 7;
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check which process is using the port
   lsof -i :3000    # for API service
   lsof -i :50051   # for Villa service
   
   # Kill process if needed
   kill -9 <PID>
   ```

2. **gRPC connection error:**
   - Ensure Villa Service is running before starting API Service
   - Check port and host configuration in environment variables

3. **TypeScript compilation errors:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Proto compilation issues:**
   ```bash
   # Regenerate protobuf files
   npm run proto:gen
   ```

### Health Checks

```bash
# Check Villa Service (gRPC)
# If service is running, there should be no error
telnet localhost 50051

# Check API Service (REST)
curl http://localhost:3000/health
```

## 🚀 Features

- ✅ **Microservice Architecture**: Separated concerns with API gateway pattern
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **gRPC Communication**: High-performance inter-service communication
- ✅ **REST API**: Standard HTTP endpoints for client integration
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **Development Ready**: Hot reload with nodemon
- ✅ **Production Ready**: Build scripts and optimization
- ✅ **Pagination**: Built-in pagination for list endpoints
- ✅ **Health Checks**: Service health monitoring endpoints

## 📈 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication and authorization
- [ ] Rate limiting and throttling
- [ ] Caching layer (Redis)
- [ ] Logging and monitoring
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use 4-space indentation
- Add proper error handling
- Include JSDoc comments for functions
- Write meaningful commit messages
- Test your changes before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Create an issue on the GitHub repository
3. Contact the development team

## ⭐ Acknowledgments

- [gRPC](https://grpc.io/) - High-performance RPC framework
- [Protocol Buffers](https://developers.google.com/protocol-buffers) - Google's serialization protocol
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript

---

**Happy Coding! 🚀**
