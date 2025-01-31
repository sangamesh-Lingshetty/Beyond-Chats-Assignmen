# ChatPlatform Assignment from BeyondChats Company

## 🚀 Live Demo
[ChatPlatform Live Link](https://beyond-chats-assignmen.vercel.app/)

---

## 📌 How It Works

### 🔹 User Registration
- Users must **register** to access all features like **Integration, Testing, Adding Chatbot**, etc.
- Two types of registration:
  1. **Email Manual Mode:** Users enter their email and receive a verification code via **EmailJS API**.
  2. **Continue with Google:** Firebase authentication fetches the user's real-time name and displays it on the main page.

### 🔹 Organization Setup
- Users enter:
  - Organization **Name**
  - **Website URL**
  - **Description**
- **Meta-Data Fetching System** (Using OpenGraph API):
  - When users enter a **valid URL**, the system fetches real-time data, including the **description** and **image URL**.

### 🔹 Page Analysis & Setup
- Analyzes the website to check the **number of pages** (Dummy Data for now, will integrate backend later).
- Displays **chunks of pages** with their **status**.
- Clicking on a page shows **detailed insights**.

### 🔹 Testing & Integration
#### **1️⃣ Test the Chatbot**
- Clicking this button redirects users to the **Client's Website**, showcasing a **dummy chatbot with real functionality**.

#### **2️⃣ Integrate on Your Website**
- Two options available:
  - **Copy-Paste Code:** Clients can copy and insert a dummy code into `<head>` of their website.
  - **Mail Instructions:** Sends integration steps to the client's developer.

#### **3️⃣ Test Integration**
- Opens a new screen with:
  - 🎉 **Confetti Success UI** if the integration is successful.
  - **Explore Admin Panel** Button
  - **Start Talking to Your Chatbot** Button
  - **Social Media Sharing** Options
  - Alternative UI for cases where integration isn't detected.

---

## 🛠️ Tools & Technologies
- **Frontend:** React.js, JavaScript, TailwindCSS
- **API Services:** EmailJS, OpenGraph API, Firebase Authentication
- **External Tools:** Bootstrap, Framer Motion, Icons, etc.
- **Features:**
  - ✅ **Fully Responsive** (Mobile, Tablet, Desktop)
  - ✅ **Real-time Data Fetching**
  - ✅ **Secure Authentication**

---

## 📂 Project Structure
```plaintext
📦 ChatPlatform
├── 📂 src
│   ├── 📂 Components
│   │   ├── LandingPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ChatbotWidget.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── 📂 public
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
```

---

## 📜 How to Run Locally
```bash
# Clone the repository
git clone https://github.com/your-username/ChatPlatform.git

# Navigate to project folder
cd ChatPlatform

# Install dependencies
npm install

# Create a .env file and add your API keys
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_measurementId=your_measurement_id

# Start the development server
npm run dev
```

---

## 🤝 Contributing
Contributions are welcome! Feel free to submit a PR or open an issue.

---

## 📧 Contact
For any inquiries, feel free to reach out at: **sangameshlingshetty@gmail.com**
