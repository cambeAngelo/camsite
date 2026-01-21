# 📡 Camsite API Documentation

## Base URL

```
Local Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## Authentication

All requests to protected endpoints must include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Get a token by logging in:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

---

## Response Format

All responses follow this format:

### Success Response
```json
{
  "ok": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "ok": false,
  "error": "Error message describing what went wrong"
}
```

---

## Authentication Endpoints

### Register New User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** `201 Created`
```json
{
  "ok": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "first_name": "John",
      "last_name": "Doe"
    }
  }
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Validation error (missing fields, invalid email, etc)
- `409` - Email or username already exists
- `500` - Server error

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "first_name": "John",
      "last_name": "Doe"
    }
  }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

---

### Get Current User
**GET** `/auth/me` (Protected)

Get the current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "avatar_url": null,
    "bio": null,
    "location": null,
    "website": null,
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (missing or invalid token)
- `500` - Server error

---

### Update User Profile
**PUT** `/auth/me` (Protected)

Update the current user's profile information.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "I'm a web developer",
  "location": "San Francisco, CA",
  "website": "https://example.com",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "I'm a web developer",
    "location": "San Francisco, CA",
    "website": "https://example.com",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

**Status Codes:**
- `200` - Profile updated
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

## Portfolio Endpoints

### Get My Portfolio
**GET** `/portfolios` (Protected)

Get the current user's portfolio.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "My Portfolio",
    "slug": "username",
    "description": "Welcome to my portfolio",
    "theme": "minimal",
    "color_scheme": "blue",
    "is_published": true,
    "view_count": 42,
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Portfolio not found
- `500` - Server error

---

### Get Public Portfolio
**GET** `/portfolios/:slug`

Get a public portfolio by slug (no authentication needed).

**Parameters:**
- `slug` - Portfolio slug (e.g., "john-doe")

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "My Portfolio",
    "slug": "username",
    "theme": "minimal",
    "color_scheme": "blue",
    "is_published": true,
    "view_count": 43,
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Portfolio not found or not published
- `500` - Server error

---

### Update Portfolio
**PUT** `/portfolios` (Protected)

Update the current user's portfolio settings.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "John's Portfolio",
  "description": "Welcome to my work",
  "theme": "modern",
  "color_scheme": "purple",
  "is_published": true
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "John's Portfolio",
    "slug": "username",
    "description": "Welcome to my work",
    "theme": "modern",
    "color_scheme": "purple",
    "is_published": true,
    "view_count": 43
  }
}
```

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `404` - Portfolio not found
- `500` - Server error

---

## Project Endpoints

### Get Projects by Portfolio
**GET** `/projects/portfolio/:portfolioId`

Get all projects in a portfolio.

**Parameters:**
- `portfolioId` - Portfolio ID

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "portfolio_id": 1,
      "user_id": 1,
      "title": "E-Commerce Website",
      "description": "Built with React and Node.js",
      "image_url": "https://example.com/project.jpg",
      "technologies": ["React", "Node.js", "MySQL"],
      "tags": ["web", "fullstack"],
      "position": 0,
      "is_featured": true,
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### Get My Projects
**GET** `/projects` (Protected)

Get all projects for the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "portfolio_id": 1,
      "user_id": 1,
      "title": "E-Commerce Website",
      "description": "Built with React and Node.js",
      "image_url": "https://example.com/project.jpg",
      "technologies": ["React", "Node.js", "MySQL"],
      "tags": ["web", "fullstack"],
      "position": 0,
      "is_featured": true
    }
  ]
}
```

---

### Create Project
**POST** `/projects` (Protected)

Create a new project in your portfolio.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "portfolio_id": 1,
  "title": "Mobile App",
  "description": "iOS and Android app",
  "image_url": "https://example.com/app.jpg",
  "technologies": ["React Native", "Firebase"],
  "tags": ["mobile", "app"],
  "is_featured": true
}
```

**Response:** `201 Created`
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "portfolio_id": 1,
    "user_id": 1,
    "title": "Mobile App",
    "description": "iOS and Android app",
    "image_url": "https://example.com/app.jpg",
    "technologies": ["React Native", "Firebase"],
    "tags": ["mobile", "app"],
    "position": 1,
    "is_featured": true,
    "created_at": "2024-01-03T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Project created
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

### Update Project
**PUT** `/projects/:projectId` (Protected)

Update a project.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parameters:**
- `projectId` - Project ID

**Request Body:**
```json
{
  "title": "Updated Mobile App",
  "description": "iOS and Android app with new features",
  "technologies": ["React Native", "Firebase", "Redux"],
  "is_featured": false
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "portfolio_id": 1,
    "user_id": 1,
    "title": "Updated Mobile App",
    "description": "iOS and Android app with new features",
    "image_url": "https://example.com/app.jpg",
    "technologies": ["React Native", "Firebase", "Redux"],
    "tags": ["mobile", "app"],
    "is_featured": false
  }
}
```

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not your project)
- `404` - Project not found
- `500` - Server error

---

### Delete Project
**DELETE** `/projects/:projectId` (Protected)

Delete a project.

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `projectId` - Project ID

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "message": "Project deleted successfully"
  }
}
```

**Status Codes:**
- `200` - Deleted successfully
- `401` - Unauthorized
- `403` - Forbidden (not your project)
- `404` - Project not found
- `500` - Server error

---

## Skills Endpoints

### Get My Skills
**GET** `/skills` (Protected)

Get all skills for the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "name": "React",
      "proficiency": 90,
      "position": 0,
      "created_at": "2024-01-01T12:00:00.000Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Node.js",
      "proficiency": 85,
      "position": 1,
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### Create Skill
**POST** `/skills` (Protected)

Add a new skill.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "TypeScript",
  "proficiency": 80
}
```

**Response:** `201 Created`
```json
{
  "ok": true,
  "data": {
    "id": 3,
    "user_id": 1,
    "name": "TypeScript",
    "proficiency": 80,
    "position": 2,
    "created_at": "2024-01-04T12:00:00.000Z"
  }
}
```

---

### Update Skill
**PUT** `/skills/:skillId` (Protected)

Update a skill.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "TypeScript",
  "proficiency": 85,
  "position": 1
}
```

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "id": 3,
    "user_id": 1,
    "name": "TypeScript",
    "proficiency": 85,
    "position": 1
  }
}
```

---

### Delete Skill
**DELETE** `/skills/:skillId` (Protected)

Delete a skill.

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": {
    "message": "Skill deleted"
  }
}
```

---

## Experience Endpoints

### Get My Experiences
**GET** `/experiences` (Protected)

Get all work experiences.

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Senior Developer",
      "company": "Tech Corp",
      "description": "Led development of web applications",
      "start_date": "2022-01-15",
      "end_date": null,
      "is_current": true,
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### Create Experience
**POST** `/experiences` (Protected)

Add a new work experience.

**Request Body:**
```json
{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "description": "Led development of web applications",
  "start_date": "2022-01-15",
  "end_date": null,
  "is_current": true
}
```

**Response:** `201 Created`

---

### Update Experience
**PUT** `/experiences/:experienceId` (Protected)

Update a work experience.

**Request Body:**
```json
{
  "title": "Lead Developer",
  "company": "Tech Corp",
  "description": "Managed development team",
  "start_date": "2022-01-15",
  "end_date": null,
  "is_current": true
}
```

**Response:** `200 OK`

---

### Delete Experience
**DELETE** `/experiences/:experienceId` (Protected)

Delete a work experience.

**Response:** `200 OK`

---

## Template Endpoints

### Get All Templates
**GET** `/templates`

Get all available portfolio templates.

**Response:** `200 OK`
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Minimal",
      "slug": "minimal",
      "description": "Clean and simple template",
      "preview_url": "https://example.com/templates/minimal",
      "thumbnail_url": "https://example.com/minimal.jpg",
      "layout_config": {}
    }
  ]
}
```

---

## HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid data or missing fields |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | No permission to access resource |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email/username already exists |
| 500 | Server Error | Database or server error |

---

## Error Examples

### Missing Required Field
```json
{
  "ok": false,
  "error": "Title is required"
}
```

### Invalid Token
```json
{
  "ok": false,
  "error": "Invalid or expired token"
}
```

### Unauthorized Action
```json
{
  "ok": false,
  "error": "You can only modify your own portfolio"
}
```

### Resource Not Found
```json
{
  "ok": false,
  "error": "Project not found"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## CORS

Cross-Origin Resource Sharing is enabled. 

**Allowed Origins:**
- Local: `http://localhost:5173`
- Production: Configure in `.env` with `CLIENT_ORIGIN`

**Allowed Methods:**
- GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:**
- Content-Type
- Authorization

---

## Best Practices

1. **Always include token in Authorization header** for protected endpoints
2. **Use HTTPS in production** for security
3. **Validate input on client side** before sending
4. **Handle 401 errors** by redirecting to login
5. **Store token in localStorage** (frontend handles this)
6. **Include Content-Type header** when sending JSON

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "username":"username",
    "password":"password",
    "firstName":"John",
    "lastName":"Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"password"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Support

For issues, check:
- Ensure token is valid and not expired
- Verify Authorization header format: `Bearer <token>`
- Check response `ok` field: true/false
- Review error message for details
