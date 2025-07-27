const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/admin", require("./routes/authRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/executives", require("./routes/executiveRoutes"));
app.use("/api/editorials", require("./routes/editorialRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/workshops",  require("./routes/workshopRoutes"));
app.use("/api/awards", require("./routes/awardRoutes"));
app.use("/api/awardees", require("./routes/awardeesRoutes"));
app.use("/api/awardn", require("./routes/awardNominationRoutes"));
app.use("/api/memberships",require("./routes/membershipRoutes"));
app.use("/api/payment-details", require("./routes/paymentDetailRoutes"));
app.use("/api/membership-registrations", require("./routes/membershipRegistrationRoutes"));

app.use("/api/downloads", require("./routes/downloadRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
