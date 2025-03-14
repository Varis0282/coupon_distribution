# Round-Robin Coupon Distribution System

A web application that distributes coupons to guest users in a round-robin manner, with mechanisms to prevent abuse through page refreshes.

## Features

- **Round-Robin Coupon Distribution**: Coupons are assigned sequentially to users to ensure even distribution.
- **Guest Access**: Users can access the system without requiring login or account creation.
- **Abuse Prevention**:
  - IP Tracking: Records each user's IP address upon claiming a coupon, restricting subsequent claims from the same IP within a specified time frame (one hour).
  - Cookie Tracking: Uses cookies to monitor coupon claims from the same browser session.
- **User Feedback**: Provides clear messages indicating successful coupon claims or informs users of the time remaining before they can claim another.

## Tech Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-studio-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/coupon_system?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

6. Seed the database with initial coupons by visiting:
   ```
   http://localhost:3000/api/seed-coupons
   ```

### Deployment

1. Create a Vercel account if you don't have one.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy the application:
   ```bash
   vercel
   ```
4. Follow the prompts to complete the deployment.
5. Add the environment variables in the Vercel dashboard.

## Abuse Prevention Strategies

### IP Tracking

The system records the IP address of each user who claims a coupon. If a user attempts to claim another coupon within the restricted time frame (one hour), the system will reject the request and inform the user of the time remaining before they can claim another coupon.

Implementation:
- The server extracts the client's IP address from the request headers.
- When a coupon is claimed, the IP address is stored in the database along with the timestamp.
- Before assigning a new coupon, the system checks if the IP address has claimed a coupon within the last hour.

### Cookie Tracking

In addition to IP tracking, the system uses cookies to identify users across sessions. This helps prevent abuse even if users try to clear their browser cache or use incognito mode.

Implementation:
- A unique identifier is generated and stored as a cookie in the user's browser.
- This identifier is sent with each coupon claim request.
- The system checks if the cookie ID has been used to claim a coupon within the restricted time frame.

### Combined Approach

By using both IP tracking and cookie tracking, the system can effectively prevent most common abuse scenarios:
- Users refreshing the page to get multiple coupons
- Users clearing cookies or using incognito mode
- Multiple users behind the same NAT (e.g., in a corporate network)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
