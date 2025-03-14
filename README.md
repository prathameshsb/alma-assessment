# Lead Management App

A simple Next.js application for managing leads submitted by users. Users can submit visa-related forms, and admins can review and update them. Built with Next.js, TypeScript, and NextAuth for authentication.

---

## **Setup Guide: Running the Application Locally**

### **Prerequisites**
You'll need the following installed:
- Node.js (v18+) → [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Git (for cloning the repo)

### **Steps to Run Locally**
1. Clone the repository:
```bash
git clone https://github.com/your-repo/lead-management-app.git
cd lead-management-app
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a `.env.local` file and add:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
```
4. Run the app:
```bash
npm run dev
```
- App will be live at `http://localhost:3000`
- Admin dashboard at `http://localhost:3000/admin`

---

## **Architecture & Design**

This app is built using Next.js with API routes for backend logic. It uses NextAuth for authentication and React hooks for state management.

### **Why Next.js?**
- Server-side rendering (good for SEO)
- API routes included (no need for a separate backend)
- Fast image optimization (`next/image`)

### **Authentication**
- Users log in using NextAuth.js
- JWT-based authentication (no session storage needed)

### **State Management**
- Uses `useReducer` for managing form state
- `useMemo` for sorting and filtering leads efficiently

### **Sorting & Pagination**
- Lead data is sorted client-side using `useMemo()`
- Pagination is handled using `slice()`

---

## **API Routes**

| Route          | Method | Description              |
|---------------|--------|---------------------------|
| `/api/leads`  | GET    | Fetch all submitted leads |
| `/api/leads`  | POST   | Submit a new lead         |

Example API call:
```ts
fetch("/api/leads")
  .then(res => res.json())
  .then(data => console.log(data));
```